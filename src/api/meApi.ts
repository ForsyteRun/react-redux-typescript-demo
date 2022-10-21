import { ProfileType } from "../types/types";
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

 type AvatarType = {
  image: string 
  id: number
 }
  
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
      debugger
       const res = await instance.put<AvatarType>('myProfile/2', {
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
       const res = await instance.get<AvatarType>('myProfile/2');
       return res.data.image;
     } catch (error) {
       throw new Error("Error in getAvatar:" + error);
     }
   },
 
   // data of me
   getProfileInfo: async () => {
    try {
      const res = await instance.get<ProfileType>('myProfile/1')
      return res.data
    } catch (error) {
      throw new Error('Error in getProfileInfo:' + error);
    }
  },

   setProfileInfo: async (data: ProfileType) => {
    try {    
      const res = await instance.put<ProfileType>('myProfile/1', data)
      return res.data
    } catch (error) {
      throw new Error('Error in setProfileInfo:' + error);
    }
  },
 };