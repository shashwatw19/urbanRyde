const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL

export const USER = {
    signin  : BASE_URL +"/user/signin",
    signup : BASE_URL + "/user/signup",
    logout : BASE_URL + "/user/logout",
    checkAuth : BASE_URL + "/user/checkAuth"
}

export const CAPTAIN = {
    signup : BASE_URL + "/captain/registerCaptain",
    signin : BASE_URL + "/captain/captainLogin",
    logout : BASE_URL + "/captain/logoutCaptain",
    checkAuth : BASE_URL + "/captain/checkAuth"
}
export const OTP = {
    create : BASE_URL + "/otp/create"
}

export const MAP = {
    suggetions : BASE_URL + "/map/get-suggestions" 
}
