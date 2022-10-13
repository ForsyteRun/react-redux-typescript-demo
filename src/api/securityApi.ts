import axios from "axios";

//captcha
export const securityApi = {
   getCaptcha: async () => {
     try {
       const res = await axios.get<string>("security/get-captcha-url");
       return res.data;
     } catch (error) {
       throw new Error("Error in outAuth:" + error);
     }
   },
 };
 