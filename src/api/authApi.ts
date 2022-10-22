import { ResultCodeEnum, samuraiInstance } from "./api";

type AuthAPI = {
  resultCode: ResultCodeEnum 
    messages: Array<string>
    data: ResponseAuthApi
 };

 type ResponseAuthApi = {
   id: number
      email: string 
      login: string
 };

 export type AuthMe = {
  data: {
    id: number;
  };
  fieldsErrors: Array<string>
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};
 
export const authAPI = {
     //load autorization data of me
     authMe: async () => {
      try {
        const res = await samuraiInstance.get<AuthAPI>("auth/me", {
          withCredentials: true,
        });
          return res.data;
      } catch (error) {
        throw new Error(`Error in authMe: ${error}`);
      }
    },
   //log-in me
   enterAuth: async (email: string | null, password: string | null, rememberMe: boolean, captcha: string | null) => {
     try {
       const res = await samuraiInstance.post<AuthMe>("auth/login", {email, password, rememberMe, captcha},
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
       const res = await samuraiInstance.delete<AuthMe>("auth/login");
       return res.data;
     } catch (error) {
       throw new Error("Error in outAuth:" + error)
     }
   },
 };
 