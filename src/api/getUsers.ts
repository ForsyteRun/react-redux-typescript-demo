import axios from "axios";
import { UserData } from "../types/types";
import { instanceMock } from "./api";

type GetUsersApi =  Array<UserData>;
  

type Follow = {
  id: number;
  isFollow: boolean;
};

export const usersApi = {
  getUsers: async (pageSize: number = 3, currentPage: number = 0) => {
    try {
      const res = await instanceMock.get<GetUsersApi>(
        `post?limit=${pageSize}&offset=${currentPage}`
      );
      return res.data;
    } catch (error: any) {
      throw new Error(`Error in getUsersApi: ${error.message}`);
    }
  }, 
  getUserProfile: async (id: number) => {
    try {
      const res = await axios.get<UserData>(instanceMock + "users/" + id);
      return res.data;
    } catch (error) {
      throw new Error(`Error in getUserProfile: ${error}`);
    }
  },
  setFollow: async (id: number) => {
    try {
      const res = await instanceMock.put<Follow>(`users/${id}`, {
        isFollow: true,
      });
      return res.data;
    } catch (error) {
      throw new Error(`Error in setFollow: ${error}`);
    }
  },
  setUnFollow: async (id: number) => {
    try {
      const res = await instanceMock.put<Follow>(`users/${id}`, {
        isFollow: false,
      });
      return res.data;
    } catch (error) {
      throw new Error(`Error in setUnFollow: ${error}`);
    }
  },
};

