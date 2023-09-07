import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://crimson-chimpanzee-suit.cyclic.app/",
});

export default axiosInstance;

//function to set token as header when sending api requests
export function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { "x-access-token": user.token };
  } else {
    return {};
  }
}
