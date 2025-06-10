import axios from "axios";

export const axiosInstance = axios.create({withCredentials : true});

interface ApiConnectorParams {
    method: string;
    url: string ;
    bodyData?: any;
    headers?: Record<string, string>;
    params?: Record<string, any>;
}

export const apiConnector = (
    method: ApiConnectorParams["method"],
    url: ApiConnectorParams["url"],
    bodyData?: ApiConnectorParams["bodyData"],
    headers?: ApiConnectorParams["headers"],
    params?: ApiConnectorParams["params"]
) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData  ,
        headers: headers  ,
        params: params  ,
        withCredentials : true
    });
};
