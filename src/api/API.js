
  const OPENAI_API_KEY=process.env.REACT_APP_OPENAI_API_KEY;
const WISPER_END_POND=process.env.REACT_APP_WISPER_END_POND;
const GPT_END_POND="https://api.openai.com/v1/chat/completions";


  export const processinput = function(textin){
    setIsSending(true);
    let newChat={role: "user", content: textin};
    fetch(GPT_END_POND,
     {
      body: JSON.stringify({
         "model":"gpt-3.5-turbo",
          "messages":[
                   System,
                  ...chatHistory,
                  newChat
                 ],
          "temperature": 0.2,
          "max_tokens": 2000
        }), 
        method: "POST",
        headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + OPENAI_API_KEY,
      }
     }).then((response) => {        
        //console.log(response);  
          if (response.ok) {
            response.json().then((json) => {
            console.log(json);  
  
          //  console.log(json.choices[0].message.content) 
            let response={role: "assistant", content:json.choices[0].message.content};
            setChatHistory([...chatHistory, newChat, response ])  ;
            setInputText('');
            setIsSending(false);
          });
      }else{
        setIsSending(false);
         Alert.alert("Puff ! Quelque chose ne va pas !","Revener plus tard !",
                  [
                    { 
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel' },
                  { cancelable: true, }
                 ] )
  
      }
    }).catch(error=>{
      console.log(error) ;
    } );
   }
