import axios from "axios"
const tokenString = localStorage.getItem('token');
const userToken = JSON.parse(tokenString);
 
      
const axiosInstance =  axios.create({
        baseURL: 'http://localhost:5000/api/v1/',
        headers: userToken?{'Authorization': 'Bearer ' +userToken}:{}
    });


// const ssEvents = new EventSource('http://localhost:5000/api/v1/stream-events/')

export default axiosInstance
// export {ssEvents}