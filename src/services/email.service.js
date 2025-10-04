
import { customAxios } from "./helper";
export async function sendEmail(emailData){

  const result=(await customAxios.post(`/send-html`, emailData) ).data;

  return result;
}