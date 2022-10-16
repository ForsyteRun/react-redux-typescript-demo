import axios from "axios";

export const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const samuraiInstance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const instanceMock = axios.create({
  baseURL: "https://mockend.com/ForsyteRun/react-redux-typescript-demo/",
});

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
};
