import { FormikValues } from 'formik';
import { instance, instanceMock, ResultCodeEnum, samuraiInstance } from "./api";

type AuthMe = {
   data: {
     id: number;
     email: string;
     login: string;
   };
   resultCode: ResultCodeEnum;
   messages: Array<string>;
 };
 
 type Status = {
   id: number;
   status: string;
 };
 
 type LoadDataProfile = {
   lookinForJob: string;
   lookinForJobDiiscription: string;
   fullName: string;
   id: number;
   image: string;
 };
 
export const meAPI = {

   //load autorization data of me
   authMe: async () => {
     try {
       const res = await samuraiInstance.get<AuthMe>("auth/me", {
         withCredentials: true,
       });
         return res;
     } catch (error) {
       throw new Error(`Error in authMe: ${error}`);
     }
   },
 
   //load status me
   getStatus: async () => {
     try {
       const res = await instance.get<Status>("status/1");
       return res.data;
     } catch (error) {
       throw new Error(`Error in getStatus: ${error}`);
     }
   },
 
   //update status of me
   updateStatus: async (status: string) => {
     try {
       const res = await instance.put<Status>("status/1", {
         status: status,
       });
       return res.data;
     } catch (error) {
       throw new Error("Error in updateStatus:" + error);
     }
   },
 
   //load avatar of me
   setAvatar: async (url: string) => {
     try {
       const res = await instance.put<LoadDataProfile>("status/1", {
         image: url,
       });
       return res.data.image;
     } catch (error) {
       throw new Error("Error in loadAvatar:" + error);
     }
   },
 
   //load initial avatar of me
   getAvatar: async () => {
     try {
       const res = await instanceMock.get<LoadDataProfile>("myProfile/1");
       return res.data.image;
     } catch (error) {
       throw new Error("Error in getAvatar:" + error);
     }
   },
 
   // data of me
   getProfileInfo: async () => {
    try {
      const res = await instanceMock.get<LoadDataProfile>('myProfile/1')
      return res.data
    } catch (error) {
      throw new Error('Error in getProfileInfo:' + error);
    }
  },
 };