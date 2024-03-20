import axios from "axios";

const api = axios.create({
  baseURL: "https://rick-and-morty-api-c1be0d6c8b1a.herokuapp.com",
});

export { api };
