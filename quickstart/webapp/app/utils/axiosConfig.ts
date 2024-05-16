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

export async function axiosConfig(
  axiosConfigRequestObject: AxiosConfigRequestObject
): Promise<AxiosConfigObject> {

  let BASEURL: string = "http://localhost:8000"

    if (axiosConfigRequestObject.data) {
      return {
        method: axiosConfigRequestObject.method,
        url: BASEURL + axiosConfigRequestObject.path,
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
        url: BASEURL + axiosConfigRequestObject.path,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "AuthorizationType": "jwt",
        },
      }
    }
}

