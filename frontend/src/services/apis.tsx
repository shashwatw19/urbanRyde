const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL_FORWARDED

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
export const RIDE = {
    GET_FARE : BASE_URL + "/ride/get-fare" ,
    CREATE_RIDE : BASE_URL + "/ride/create",
    CONFIRM_RIDE : BASE_URL + "/ride/confirm-ride",
    START_RIDE : BASE_URL + "/ride/start-ride",
    VERIFY_RIDE_USER : BASE_URL + "/ride/verify/user",
    VERIFY_RIDE_CAPTAIN : BASE_URL + "/ride/verify/captain",
    REQUEST_PAYMENT : BASE_URL + "/ride/request-payment"
}
