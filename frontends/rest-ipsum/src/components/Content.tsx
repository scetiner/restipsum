import React, { useEffect, useState } from 'react';
import { useGenerateSchema, useGenerateSample, useGenerateToken } from '../hooks/useSchema';
import SAMPLE_JSON from './sample.json';
import CodeEditor from './CodeEditor';

const Content: React.FC = () => {
  const [jsonInputString, setJsonInputString] = useState(JSON.stringify(SAMPLE_JSON, null, 2));
  const [schemaString, setSchemaString] = useState('{}');
  const [generatedSampleString, setGeneratedSampleString] = useState('{}');
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);
  const [schemaStatus, setSchemaStatus] = useState<React.ComponentProps<typeof CodeEditor>['status']>();

  const generateSchemaMutation = useGenerateSchema();
  const generateSampleMutation = useGenerateSample();
  const generateTokenMutation = useGenerateToken();

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(`http://localhost:8081/api/ipsum/${token}`);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy token:', err);
    }
  };

  const handleGenerateSchema = async (content: string) => {
    try {
      const result = await generateSchemaMutation.mutateAsync({ sample: JSON.parse(content) });
      setSchemaString(JSON.stringify(result.schema, null, 2));
      
      if (result.partial) {
        setSchemaStatus({
          type: 'warning',
          message: 'Partial Schema'
        });
      } else {
        setSchemaStatus({
          type: 'success',
          message: 'Complete Schema'
        });
      }
    } catch (error) {
      console.error('Failed to generate schema:', error);
      setSchemaStatus({
        type: 'error',
        message: 'Failed to generate'
      });
    }
  };

  const handleGenerateSample = async (content: string) => {
    try {
      const result = await generateSampleMutation.mutateAsync({ schema: JSON.parse(content) });
      setGeneratedSampleString(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Failed to generate sample:', error);
    }
  };

  const handleGenerateToken = async (content: string) => {
    try {
      const result = await generateTokenMutation.mutateAsync({ schema: JSON.parse(content) });
      console.log('result',result);
      setToken(result.token);
    } catch (error) {
      console.error('Failed to generate token:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CodeEditor
        title="Your JSON"
        buttonText="Generate Schema"
        initialContent={jsonInputString}
        onChange={(str)=>setJsonInputString(str)}
        onGenerate={(content)=>handleGenerateSchema(content)}
      />
      <CodeEditor
        title="Generated Schema"
        buttonText="Generate Sample"
        initialContent={schemaString}
        onChange={(str)=>setSchemaString(str)}
        onGenerate={(content)=>handleGenerateSample(content)}
        status={schemaStatus}
      />
      <CodeEditor
        title="Generated Sample"
        buttonText="Generate Token"
        initialContent={generatedSampleString}
        onGenerate={()=>handleGenerateToken(schemaString)}
      />
      {token && (
        <div className="col-span-full bg-[#1c1c1c] rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-200">API Token</h3>
            <button
              onClick={handleCopyToken}
              className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800 rounded-md hover:bg-slate-700 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-300 break-all space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-slate-500 text-xs">Base URL:</span>
              <a 
                href={`http://localhost:8081/api/ipsum/${token}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                http://localhost:8081/api/ipsum/{token}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-500 text-xs">With Count:</span>
              <a 
                href={`http://localhost:8081/api/ipsum/${token}/10`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                http://localhost:8081/api/ipsum/{token}/10
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content; 