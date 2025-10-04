import axios from "axios";

const baseURL="http://localhost:8081/api/email/v1";

export const customAxios=axios.create({
  baseURL:baseURL,
});