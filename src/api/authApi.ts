import { samuraiInstance } from "./api";

type AuthAPI = {
   email: string;
   password: number;
   rememberMe: boolean;
   captcha: string;
 };
 
export const authAPI = {

   //log-in me
   enterAuth: async (login: string | null, email: string | null, rememberMe: boolean, captcha: string | null) => {
     try {
       const res = await samuraiInstance.post<AuthAPI>("auth/login", {login, email, rememberMe, captcha},
         { withCredentials: true }
       )
       return res.data;
     } catch (error) {
       throw new Error("Error in enterAuth:" + error)
     }
   },

   //log-out me
   outAuth: async () => {
     try {
       const res = await samuraiInstance.delete<AuthAPI>("auth/login");
       return res.data;
     } catch (error) {
       throw new Error("Error in outAuth:" + error)
     }
   },
 };
 