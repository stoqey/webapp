import { includes } from "lodash";

const urlFromJson = process.env.NEXT_PUBLIC_API_URL;

/**
 * GetBackendHost
 * @returns 
 */
export const getBackendHost = () => {
  
    let useHttps = false;
  
    if (includes(urlFromJson, ".co")) {
      useHttps = true;
    }
  
    const devBaseUrl = `://${urlFromJson}`;
    const backendUrl = `http${useHttps ? "s" : ""}${devBaseUrl}`;
    return backendUrl;
}