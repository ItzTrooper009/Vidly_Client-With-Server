import Axios from "axios";
import { toast } from "react-toastify";

Axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedErrors) {
    console.log("consoling errors", error);
    toast.error("An Unexpected error occured"); //as toast is an object and objects are function so we can use only toast without error
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  Axios.defaults.headers.common["x-auth-token"] = jwt;
}

const obj = {
  get: Axios.get,
  post: Axios.post,
  delete: Axios.delete,
  put: Axios.put,
  setJwt,
};

export default obj;
