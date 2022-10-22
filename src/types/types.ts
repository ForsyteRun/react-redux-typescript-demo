export type ActionsType<T> = T extends {[key:string]: (...args: any[]) => infer U} ? U : never

export type UserData = {
  id: number
  isFollow: boolean
  name: string
  photo: string
  status: string
 };

 export type ProfileType = {
  lookinForJob: string | null
  lookinForJobDiiscription: string | null
  fullName: string | null 
};

export type CaptchaType = {
  login: string | null,
  email: string | null,
  rememberMe: boolean,
  captcha: string | null
};