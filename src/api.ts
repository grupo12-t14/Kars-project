import axios from "axios";

const carsApi = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com/cars",
  timeout: 5000,
});

const localApi = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 5000,
});

export { carsApi, localApi };
