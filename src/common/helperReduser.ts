import { UserData } from "../types/types";


export let followUnFollowHelper = (
  users: Array<UserData>,
  id: number,
  followed: boolean
) => {
  return users.map((el) => {
    if (el.id === id) {
      return {
        ...el,
        isFollow: followed,
      };
    }
    return el;
  });
};
