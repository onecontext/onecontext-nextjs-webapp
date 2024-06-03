"use server"

export interface AxiosConfigRequestObject {
  method: "post" | "get" | "patch" | "delete";
  path: string;
  credentials?: boolean;
  data?: any;
}
export interface AxiosConfigObject {
  method: "post" | "get" | "patch" | "delete";
  url: string;
  headers: Record<string, string>;
  data?: any;
}

const BASE_URL: string = process.env.BASE_URL!

export async function axiosConfig(
  axiosConfigRequestObject: AxiosConfigRequestObject
): Promise<AxiosConfigObject> {

    if (axiosConfigRequestObject.data) {
      return {
        method: axiosConfigRequestObject.method,
        url: BASE_URL + axiosConfigRequestObject.path,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "AuthorizationType": "jwt",
        },
        data: axiosConfigRequestObject.data
      }
    } else {
      return {
        method: axiosConfigRequestObject.method,
        url: BASE_URL + axiosConfigRequestObject.path,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "AuthorizationType": "jwt",
        },
      }
    }
}

