import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text, View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EmptyElement from '../Components/EmptyElement';
import AppColor from '../constants/colors';

const OPENAI_API_KEY="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" ;
const { Configuration, OpenAIApi } = require("openai");



const ResponseBLoc=({item}) => {
    
    
    return(
        <View style={[styles.chatBubble]}>          
            {item.role === 'user'?<Icon name="ios-person-circle-outline" size={30} color="#4F8EF7"/>:<Image source={require("../assets/botmin.jpg")} style={{width:35,height:35}}/>}          
            <Text style={styles.chatText}>{item.content}</Text>
        </View>
        ) ;
}
const Home = () => {

const [inputText, setInputText] = React.useState('');
const System={role: "system",  content: "Bonjour ChatGpt!"};
const [chatHistory, setChatHistory] = React.useState([System,]);


const processinput = function(textin){
  let newChat={role: "user", content: textin};
  fetch( `https://api.openai.com/v1/chat/completions`,
   {
    body: JSON.stringify({
       "model":"gpt-3.5-turbo",
        "messages":[
                 System,
                ...chatHistory,
                newChat
               ],
        "temperature": 0.3,
        "max_tokens": 2000
      }), 
      method: "POST",
      headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    }
   }).then((response) => {    
        if (response.ok) {
          response.json().then((json) => {
          console.log(json);  

          console.log(json.choices[0].message.content) 
          let response={role: "assistant", content:json.choices[0].message.content};
          setChatHistory([...chatHistory, newChat, response ])  ;
          setInputText('');
        });
    }else{
      
    }
  });
 }


return (
<View style={styles.container}>

<FlatList
data={chatHistory}
keyExtractor={(item, index) => index.toString()}
contentContainerStyle={styles.chatContainer}

ListEmptyComponent={<EmptyElement /> }
renderItem={({ item }) => <ResponseBLoc item={item}/> }/>

<View style={styles.inputContainer}>
<TextInput
       style={styles.inputText}
       placeholder="Posez une question ou discutez avec le bot..."
       value={inputText}
       onChangeText={setInputText}
     />
  <TouchableOpacity  onPress={()=> {processinput(inputText)}}><Icon name="send-outline" size={30} color="#4F8EF7" /></TouchableOpacity>   

</View>
</View>
);
}

export default Home;

const styles = StyleSheet.create({
    container: {       
     height:"100%",
   
    },
    chatContainer: {   
      padding: 20,
    },
    chatBubble:{
       backgroundColor:AppColor.primary,
       borderColor:AppColor.secondary,
       padding:10,
       margin:8,
       borderRadius:15,
       flexDirection:'row',
       backgroundColor:"",
      alignContent:'center',
      alignItems:'center',
      borderBottomWidth:0.3,
    },
    chatSender: {
    fontWeight: 'bold',
    marginBottom: 5,
    },
    chatText: {
    fontSize: 16,
      margin:5,
      fontFamily: 'Cochin'
   
    },
    inputContainer:{    
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
    },
    inputText: {
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
        },
    });