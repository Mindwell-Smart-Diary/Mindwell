import axios, { Axios } from "axios";

export const testAxios = new Axios({
  transformRequest: axios.defaults.transformRequest,
  transformResponse: axios.defaults.transformResponse,
  validateStatus: () => true,
});
