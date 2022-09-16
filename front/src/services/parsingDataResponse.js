


export function parsingDataResponse(data){

    const responseRequest =  data?.data;
    const responseStatus = responseRequest.status;
    const responseData = responseRequest.data?responseRequest.data:null;
    
    if(responseStatus == 200){
        
        let responseMessage = responseRequest.message ;
        return {
            responseStatus,
            responseMessage,
            responseData
        }
    }
    else{
        let responseMessageKeys= Object.keys(responseRequest.message)
        let responseMessage = responseMessageKeys.map(item => responseRequest.message[item]) ;
        
        return {
            responseStatus,
            responseMessage,
            responseData
        }
    
    }
    
   
}