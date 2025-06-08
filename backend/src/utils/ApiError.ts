class ApiError extends Error {
    statusCode : number;
    success : boolean;
    errors : string[] ;

    constructor(statusCode : number = 500 , message : string = "something went wrong" ,success : boolean = false , errors : string[] = [] , stack? : string){
        super(message)
        this.name =  "ApiError"
        this.statusCode = statusCode
        this.success = success
        this.errors = errors


        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor);
        }

    }
}


export {ApiError}