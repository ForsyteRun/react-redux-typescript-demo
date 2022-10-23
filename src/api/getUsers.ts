import { UserData } from "../types/types";
import { instanceMock } from "./api";

type Follow = {
  id: number;
  isFollow: boolean;
};

export const usersApi = {
  getUsers: async (pageSize: number = 3, offset: number, term: string = '', friends?: null | boolean) => {
    try {
      debugger
      const res = await instanceMock.get<Array<UserData>>(
        `post?limit=${pageSize}&offset=${offset}&name_contains=${term}` + (friends === null ? '' : `&isFollow_eq=${friends}`) 
      );
      return res.data;
    } catch (error) {
      throw new Error(`Error in getUsersApi: ${error}`);
    }
  }, 
  getUserProfile: async (id: number) => {
    try {
      const res = await instanceMock.get<UserData>('post/' + id);
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

