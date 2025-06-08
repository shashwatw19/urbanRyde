class ApiResponse {
    statusCode : number;
    message : string;
    data : {};
    success : boolean ;

    constructor(statusCode : number = 200 , message : string = "success" , data : {} = {} , success : boolean = true ){
        this.statusCode = statusCode
        this.message = message
        this.success = success
        this.data = data
    }
}

export {ApiResponse}