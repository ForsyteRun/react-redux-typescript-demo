import axios from "axios";
import { UserData } from "../types/types";
import { instance } from "./api";

type GetUsersApi = {
   data: {
     users: Array<UserData>;
   };
   headers: {
     "x-total-count": number;
   };
 };

type Follow = {
  id: number;
  isFollow: boolean;
};

export const usersApi = {
  getUsers: async (pageSize: number = 10, currentPage: number = 1) => {
    try {
      const res = await instance.get<GetUsersApi>(
        `photos?_limit=${pageSize}&_page=${currentPage}`
      );
      return res;
    } catch (error: any) {
      throw new Error(`Error in getUsersApi: ${error.message}`);
    }
  }, 
  getUserProfile: async (id: number) => {
    try {
      const res = await axios.get<UserData>(instance + "users/" + id);
      return res.data;
    } catch (error) {
      throw new Error(`Error in getUserProfile: ${error}`);
    }
  },
  setFollow: async (id: number) => {
    try {
      const res = await instance.put<Follow>(`users/${id}`, {
        isFollow: true,
      });
      return res.data;
    } catch (error) {
      throw new Error(`Error in setFollow: ${error}`);
    }
  },
  setUnFollow: async (id: number) => {
    try {
      const res = await instance.put<Follow>(`users/${id}`, {
        isFollow: false,
      });
      return res.data;
    } catch (error) {
      throw new Error(`Error in setUnFollow: ${error}`);
    }
  },
};

