export default class ErrorHandler{
    constructor(){
    }

    /**
     * Handles error through the system and throws if required
     * @param {Error} err checks if error is already handled
     */
    static handleError(err){
        if(!err){
            return;
        }

        if(err instanceof Error){
            if(err.handled){
                throw err;
            }

            err.handled = true;
            console.error("Handled error:", err);
            throw err;
        }

        let msg = typeof err === "string" ? err : "Something went wrong and handled.";
        console.error(msg);
        let hError = new Error(msg);
        hError.handled = true;
        throw hError;
    }
}