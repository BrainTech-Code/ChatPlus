import React, { useEffect } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text, View, TextInput,Button,StatusBar, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EmptyElement from '../Components/EmptyElement';
import AppColor from '../constants/colors';
import * as Progress from 'react-native-progress';
import {AsyncStorage} from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';
import { Alert } from 'react-native';
import Share from 'react-native-share';
import AppConstant from '../constants/constants';

const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY=process.env.REACT_APP_OPENAI_API_KEY;
const WISPER_END_POND=process.env.REACT_APP_WISPER_END_POND;
const GPT_END_POND="https://api.openai.com/v1/chat/completions";

const ResponseBLoc=({item}) => {
    //shared item
const options ={
    message:item.content,
    title:"partage par chatPlus",
    url:null,
    email:null,
    recipient:null
    }    
const handleShared =()=>{
  Share.open(options)
     .then((res) => {
        
     }).catch((err) => {
          console.log(err);
      });
 }
    
    return(
        <View style={[styles.chatBubble]}>          
            {item.role === 'user'?<Icon name="ios-person-circle-outline" size={30} color="#4F8EF7"/>:<Image source={require("../assets/botmin.jpg")} style={{width:35,height:35}}/>}          
            <TouchableOpacity onLongPress={handleShared} ><Text style={styles.chatText}>{item.content}</Text></TouchableOpacity>
        </View>
        ) ;
}
const Home = () => {

const [inputText, setInputText] = React.useState('');
const System={role: "system",  content: "Bonjour ! Comment vous aidez ?"};
const [chatHistory, setChatHistory] = React.useState([System,]);
const [tHistory, settHistory] = useState([]);

const [file, setFile] = useState(null);
const [isSending, setIsSending] = useState(null);

const [limite, setLimite] = useState(null);

const [recording, setRecording] = React.useState();
                                    
   useEffect(() => {
    if (chatHistory.length>=AppConstant.Limite_2) {
      storeData() ;
      setLimite(true);
       }   
       //console.log("heelo",chatHistory.length);                      
      }, [chatHistory]) ;
 
                                      


const formData = new FormData();
    formData.append("file", file);
    formData.append("model", "whisper-1");
   //wisper endpoint fetching 
const wisper_fetch =fetch(WISPER_END_POND, {
  headers:{
    "Authorization": "Bearer "+OPENAI_API_KEY,
    "Content-Type": "multipart/form-data",
     },
  method: "POST",
  body: formData,
 })
  .then((response) => response.json())
  .then((result) => {
    return result;
  })
  .catch((error) => {
   

   // console.error("Error:", error);
  });

  //turbo model endpoint fetching
const processinput = function(textin){
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
        "temperature": 0.3,
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


 //sound handlering

 const playSound=async()=>{
          const { sound } = await Audio.Sound.createAsync(require('t'));
          setSound(sound);
          await sound.playAsync();
      }
const startRecording=async()=> {
  console.log("recording statr");
        try {        
          await Audio.requestPermissionsAsync();

          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
           
          const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY);
          setRecording(recording);
          
        } catch (err) {
          console.log(err);
        }
      }

 
const stopRecording=async()=>{
       
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        setaudioFile(uri)
        console.log("stoped",uri);
     }


let action_View ;
 if (inputText==="" || inputText==null) {
  action_View=<TouchableOpacity onPressOut={()=>{if(recording){stopRecording()} }} onPressIn={()=>{startRecording() }}><Icon name="mic-circle" size={30} color="#4F8EF7" /></TouchableOpacity>;
 }else {
  action_View=isSending?<ActivityIndicator />:<TouchableOpacity  onPress={()=> {if(inputText!==" "){processinput(inputText)} }}><Icon name="send-outline" size={30} color="#4F8EF7" /></TouchableOpacity>;
   }
const audioView=(<View style={styles.recordContainer} >   
                      <Text>{}</Text>
                    <TouchableOpacity onPressOut={{}} onPressI={playSound}><Progress.Bar progress={0.3} width={200} color="#2196F3"/></TouchableOpacity>
                </View>);
const limiteView=(
   <View style={styles.limitList} >
     <Text style={styles.limitText} >Oops!il parait que vous avez épuisez votre stock  </Text>
     <TouchableOpacity ><Text style={styles.premuim}>Passer au Premuim</Text></TouchableOpacity>
   </View>
  );                
return (
<View style={styles.container}>
<StatusBar
        animated={true}
        backgroundColor="#61dafb"
      
      />
<FlatList
data={chatHistory}
keyExtractor={(item, index) => index.toString()}
contentContainerStyle={styles.chatContainer}
ListEmptyComponent={<EmptyElement/>}
renderItem={({ item }) => <ResponseBLoc item={item}/>}/>
  {audioFile?audioView:null}
 
{limite?limiteView:<View style={styles.inputContainer}>
<TextInput
       style={styles.inputText}
       placeholder="Posez une question ou discutez avec le bot..."
       value={inputText}
       multiline={true} 
       onChangeText={setInputText}
    />
     {action_View} 
   
</View>}
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
    width:"100%"
    },
    inputText: {
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    width:"80%"  
        },
    recordContainer:{
      display:'flex',
      width:"100%",
      padding:4,
      flexDirection:'row'
    },
    limitList:{
      padding:5,
      margin:5
    },
    premuim:{
      color:AppColor.statusbarColor,
      fontSize:14
    },
    limitText:{
      color:"red",
         fontSize: 16
    }     
    });