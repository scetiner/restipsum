import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import log4js from 'log4js';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import http from 'http';

// Import local modules
import Logger from './src/utils/Logger.js';
import IpsumRouter from './src/route/api/index.js';
import ErrorMiddlewareRouter from './src/route/infra/middlewares/ErrorMiddleware.js';

// Environment configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_PORT = 3000;

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || DEFAULT_PORT;
        this.logger = null;
    }

    /**
     * Initialize the server
     */
    async init() {
        try {
            await this.setupLogger();
            await this.loadConfig();
            await this.setupMiddleware();
            await this.setupDatabase();
            await this.setupRoutes();
            await this.createServer();
            
            return this;
        } catch (error) {
            this.logger?.error('Server initialization failed:', error);
            throw error;
        }
    }

    /**
     * Set up logging configuration
     */
    async setupLogger() {
        const logPath = path.join(__dirname, 'log');
        const logConfigPath = path.join(__dirname, 'src', 'conf', 'log4js.json');
        
        Logger.initializeLogger(logPath, logConfigPath);
        this.logger = new Logger('app').getLogger();
    }

    /**
     * Load application configuration
     */
    async loadConfig() {
        const env = process.env.NODE_ENV || 'development';
        
        try {
            const [globalConfig, envConfig] = await Promise.all([
                import('./src/conf/config.json', { assert: { type: 'json' } }),
                import(`./src/conf/config.${env}.json`, { assert: { type: 'json' } })
            ]);

            this.config = {
                ...globalConfig.default,
                ...envConfig.default,
                isProduction: env === 'production',
                isDevelopment: env === 'development'
            };

            global.conf = this.config; // Keep for backward compatibility
            this.port = process.env.PORT || this.config.listenPort || DEFAULT_PORT;
        } catch (error) {
            throw new Error(`Failed to load configuration: ${error.message}`);
        }
    }

    /**
     * Set up Express middleware
     */
    async setupMiddleware() {
        // Security middleware
        this.app.use(helmet({
            contentSecurityPolicy: false  // Disable CSP for development
        }));
        this.app.use(cors());
        
        // Request parsing
        this.app.use(bodyParser.json({ limit: '2mb' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());

        // Logging middleware
        this.app.use(log4js.connectLogger(Logger.getHttpLogger(), {
            level: 'INFO',
            format: '[:method :status :url - :response-timems :res[content-length]] - [:req[Host] :req[x-forwarded-for] - :remote-addr] - [HTTP/:http-version - :user-agent]'
        }));

        // Handle OPTIONS requests
        this.app.use((req, res, next) => {
            if (req.method === 'OPTIONS') {
                return res.status(200).end();
            }
            next();
        });

        // API routes should be registered before static files
        this.setupRoutes();

        // Serve static files from the frontend build
        this.app.use(express.static(path.join(__dirname, 'frontend/dist')));

        // Handle SPA routing - this should be after API routes but before error handling
        this.app.get('*', (req, res) => {
            // Don't handle API routes here
            if (!req.url.startsWith('/api/')) {
                res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
            }
        });
    }

    /**
     * Set up MongoDB database connection
     */
    async setupDatabase() {
        const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/restipsum';
        
        mongoose.connection.on('connected', () => {
            this.logger.info('Database connection established:', connectionString);
        });

        mongoose.connection.on('disconnected', () => {
            this.logger.warn('Database disconnected:', connectionString);
            this.retryDatabaseConnection(connectionString);
        });

        mongoose.connection.on('error', (error) => {
            this.logger.error('Database connection error:', error);
        });

        await this.connectToDatabase(connectionString);
    }

    /**
     * Connect to MongoDB with retry mechanism
     */
    async connectToDatabase(connectionString, retryInterval = 0) {
        try {
            if (retryInterval > 0) {
                this.logger.info(`Retrying database connection in ${retryInterval} seconds`);
                await new Promise(resolve => setTimeout(resolve, retryInterval * 1000));
            }

            await mongoose.connect(connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } catch (error) {
            const nextRetry = Math.floor(5 + (Math.random() * 25));
            this.retryDatabaseConnection(connectionString, nextRetry);
        }
    }

    /**
     * Set up API routes
     */
    setupRoutes() {
        this.app.use('/api', ErrorMiddlewareRouter(1), IpsumRouter);
    }

    /**
     * Create and configure HTTP server
     */
    createServer() {
        this.server = http.createServer(this.app);
        
        this.server.on('error', this.handleServerError.bind(this));
        this.server.on('listening', () => {
            this.logger.info('Server ready. Listening on port:', this.port);
        });

        // Handle unhandled rejections
        process.on('unhandledRejection', (reason, promise) => {
            this.logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
        });
    }

    /**
     * Handle server errors
     */
    handleServerError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof this.port === 'string' ? `Pipe ${this.port}` : `Port ${this.port}`;

        switch (error.code) {
            case 'EACCES':
                this.logger.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                this.logger.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Start the server
     */
    start() {
        this.server.listen(this.port);
        return this;
    }

    /**
     * Static method to create and initialize server instance
     */
    static async create() {
        const server = new Server();
        await server.init();
        return server.start();
    }
}

// Create and export server instance
const server = Server.create().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});

export { server };
