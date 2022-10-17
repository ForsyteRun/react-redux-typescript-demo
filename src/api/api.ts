import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://630f1ba6498924524a860c3f.mockapi.io/',
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
