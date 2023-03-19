import axios from "axios";

let accessToken = "";

export function login(username: string, password: string){
    return axios
        .post("http://localhost:3333/api/login", {username, password})
        .then((res) => res.status==200 ? accessToken=res.data.token : "" )
}

export function logout() {
  return axios
      .post("http://localhost:3333/api/logout", {})
      .then((res) => {
          accessToken = "";
      })
}

export const fetchHitelesitessel = axios.create();

fetchHitelesitessel.interceptors.request.use(
    (config: any) => {
      if (!accessToken) {
        return config;
      }
  
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        }
      };
    },
    (error) => Promise.reject(error)
);

fetchHitelesitessel.interceptors.response.use(
  (response: any) => response,
  (error: any) => {return Promise.reject(error)}
);