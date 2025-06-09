const BASE_URL = "http://localhost:8000/api/v1" 


export const USER = {
    signup : BASE_URL + "/user/signup",
    signin : BASE_URL + "/user/signin",
    logout : BASE_URL + "user/logout"
}

export const CAPTAIN = {
    signup : BASE_URL + "/captain/signup",
    signin : BASE_URL + "/captain/signin",
    logout : BASE_URL + "captain/logout"
}