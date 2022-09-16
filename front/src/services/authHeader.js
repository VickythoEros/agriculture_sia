export default function authHeader(){
    const userString = localStorage.getItem('token');
    const userToken = JSON.parse(userString);
    if(userToken && userToken.token){
        return {
            'x-access-token': userToken.token
        };
    }else{
        return {}
    }
}