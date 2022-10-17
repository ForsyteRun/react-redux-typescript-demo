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
  //id: number
  image: string | null
};

// const initialState = {
//   firstName: '', 
//   lastName: '',
//   name: '',
//   id: null as null | number
// };

// type InitialState = typeof initialState;

// const reduser = (state: InitialState = initialState, action: Actions): InitialState => {
//   switch (action.type) {
//     case "SSD/DD":
//       return {
//         ...state, name: action.firstName + '' + action.lastName
//       }  
//     case "SSD/SS": 
//     return {
//       ...state, id: action.id
//     }     
//     default:
//       return state
//   }
// };

// type MyRetutneType<T> = T extends {[kye: string]: infer R} ? R : never

// type Actions = ReturnType<MyRetutneType<typeof actions>>;
// let a: Actions = {type: "SSD/SS", id: 88}

// const actions = {
//   ac1: (id: number) => ({type: 'SSD/SS', id} as const),
//   ac2: (firstName: string, lastName: string) => ({type: 'SSD/DD', firstName, lastName} as const),
// };

// type Obj2<T> = T extends {[kye: string]: infer U} ? U : never   

// let obj = {
//   a: {name: 'qqq'},
//   b: {age: 55},
//   c: {city: {adr: 'Tokio'}}
// };

//type Obj = typeof obj.a | typeof obj.b | typeof obj.c;
// let b: Obj2<typeof obj> = {name: 'nn', city: {adr:'jjj'}} 

// type Union<T> = T extends 'age' ? UserType :
// T extends 'data' ? MusicType : number

// let user: Union<'age' | 'data'> = {
//   name: '', 
//   age: 55
// };

// user = {
//   rock: '', 
//   data: 77,
// };

// const music: Union<'data'> = {
//   rock: '', 
//   data: 77,
// };

// type MusicType = {
//   rock: string
//   data: number
// };

// type UserType = {
//   name: string
//   age: number
// };

// 