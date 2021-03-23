import axios from "axios";

export default axios.create({
  /*
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json"
  }
  */
  baseURL: "https://localhost:44355/api/",
  
  //test env. IIS API  
  //baseURL: "http://localhost:5100/api/",  
  
  //production IIS API
  //baseURL: "http://10.18.18.5:5100/api/",
  //headers: {
  //  "Content-type": "application/json"
  //}
});