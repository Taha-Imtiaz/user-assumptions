import { Redirect } from "react-router-dom";

const axios = require("axios");

export var registerUser = async (data, callback) => {
  console.log(data);
  try {
    var response = await axios.post( "http://localhost:3001/api/register", data);
    console.log(response.data);
    //add data to session storage
    sessionStorage.setItem(
      "responseObj",
      JSON.stringify({
        data: response.data.data,
        token:response.data.token
      })
    );

    //redirect to assumptions
    callback();
  } catch (error) {
    console.log(error);
  }
};
export var loginUser = async (data, callback) => {
  try {
    var response = await axios.post(
      "http://localhost:3001/api/login",
      data
    );
    console.log(response.data.token);

    //add data to session storage
    sessionStorage.setItem(
      "responseObj",
      JSON.stringify({
        data: response.data.data,
        token:response.data.token
      })
    );
    //redirect to assumptions
    callback();
  } catch (error) {
    console.log(error);
  }
};
export var addAssumptions = async (assumptionObj, callback) => {
  var response = await axios.post("http://localhost:3001/api/add-assumption",  assumptionObj);
  // console.log(response)
  callback();
};

export var getUserAssumptions = async (userId) => {
    try {
       var response = await axios.get(`http://localhost:3001/api/get-users-assumption/${userId}`)
      return response.data
    } catch (error) {
    console.log(error)    
    }
    
}
export var getAssumptions = async () => {
    try {
       var response = await axios.get(`http://localhost:3001/api/get-assumption`)
      return response.data
    } catch (error) {
    console.log(error)    
    }
    
}
export var getUser = async (userId) => {
    try {
       var response = await axios.get(`http://localhost:3001/api/get-data/${userId}`)
       return response
    } catch (error) {
    console.log(error)    
    }
    
}
export var getExistingUser = async (username) => {
 try {
  var response = await axios.get(`http://localhost:3001/api/check-username/${username}`)
  return response;
 } catch (error) {
   console.log(error)
 }
}
export var addReact = async (addReactObj) => {
 try {
  var response = await axios.post(`http://localhost:3001/api/add-react`,addReactObj);
  return response
 } catch (error) {
   console.log(error)
 }

}