import { Axios } from "axios";

export const testAxios = new Axios({
  validateStatus: () => true,
});
