import { UserData } from "../types/types";
import { instance, instanceMock } from "./api";

type GetUsersApi =  Array<UserData>;
  
type Follow = {
  id: number;
  isFollow: boolean;
};

export const usersApi = {
  getUsers: async (pageSize: number = 3, offset: number) => {
    try {
      const res = await instanceMock.get<GetUsersApi>(
        `post?limit=${pageSize}&offset=${offset}`
      );
      return res.data;
    } catch (error) {
      throw new Error(`Error in getUsersApi: ${error}`);
    }
  }, 
  getUserProfile: async (id: number) => {
    try {
      const res = await instance.get<UserData>('users/' + id);
      return res.data;
    } catch (error) {
      throw new Error(`Error in getUserProfile: ${error}`);
    }
  },
  setFollow: async (id: number) => {
    try {
      const res = await instanceMock.put<Follow>(`post/${id}`, {
        isFollow: true,
      });
      return res.data;
    } catch (error) {
      throw new Error(`Error in setFollow: ${error}`);
    }
  },
  setUnFollow: async (id: number) => {
    try {
      const res = await instanceMock.put<Follow>(`post/${id}`, {
        isFollow: false,
      });
      return res.data;
    } catch (error) {
      throw new Error(`Error in setUnFollow: ${error}`);
    }
  },
};

