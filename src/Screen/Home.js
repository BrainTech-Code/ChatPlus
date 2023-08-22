import React, { useEffect } from "react";
import { ActivityIndicator, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text, View, TextInput,Button,StatusBar, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EmptyElement from '../Components/EmptyElement';
import AppColor from '../constants/colors';
import {AsyncStorage} from 'react-native';
import { useState } from 'react';
import { Alert } from 'react-native';
import Share from 'react-native-share';
import AppConstant, { flags } from '../constants/constants';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import { system } from "../constants/constants";
import ActionBar from "../Components/ActionBar";
import Tts from 'react-native-tts';
import Voice,
   {SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,} from '@react-native-voice/voice';

const OPENAI_API_KEY="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" //process.env.REACT_APP_OPENAI_API_KEY;
const WISPER_END_POND=process.env.REACT_APP_WISPER_END_POND;
const GPT_END_POND="https://api.openai.com/v1/chat/completions";

const ResponseBLoc=({item}) => {
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
       {item.role==='user'?<Icon name="ios-person-circle-outline" size={30} color="#4F8EF7"/>:<Image source={require("../assets/botmin.jpg")} style={{width:35,height:35}}/>} 
      <View style={{width:"100%",
                    }}>                         
          <TouchableOpacity onLongPress={handleShared} ><Text style={styles.chatText}>{item.content}</Text></TouchableOpacity>
          <TouchableOpacity onPress={handleShared} style={{
                             position:'relative',
                             left:'60%',}}><Icon name="share-outline" size={30} color="rgba(255,255,255,0.8)"/></TouchableOpacity>
      </View>
    </View> 
      ) ;
}

const Home = () =>{
  const [inputText, setInputText] = React.useState('');
  const System={role: "system",  content: system};
  const [chatHistory, setChatHistory] = React.useState([]);
 
  const [isSending, setIsSending] = useState(null);
  const [recording, setRecording] = React.useState();
  const [hideEditBar, sethideEditBar] = useState(false)
  const [actionSwitchIndicator, setactionSwitchIndicator] = useState(0)

  useEffect(() => {
    if (chatHistory.length>=AppConstant.Limite_2) {
      storeData() ;
      setLimite(true);
       }   
        speak(inputText);     
      }, [chatHistory]) ;

  useEffect(() => {
     Voice.onSpeechEnd = speechEndHandler;
     Voice.onSpeechEnd = speechEndHandler;
     Voice.onSpeechResults = speechResultsHandler;
     return () => {
          Voice.destroy().then(Voice.removeAllListeners);
        };
  }, [])
      

  const processinput = function(textin){
    setactionSwitchIndicator(flags.start_send_ind)
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
       
          if (response.ok) {
            response.json().then((json) => {
            console.log(json);  
  
          //  console.log(json.choices[0].message.content) 
            let response={role: "assistant", content:json.choices[0].message.content};
            setChatHistory([...chatHistory, newChat, response ])  ;
            setInputText('');
            setactionSwitchIndicator(flags.end_send_ind)
          });
      }else{
        setactionSwitchIndicator(flags.end_send_ind)
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

  
   const storeData = async () => {
    try {
      await AsyncStorage.setItem(
        AppConstant.chatSize,
        chatHistory.length,
      );
    } catch (error) {
      // Error saving data
    }
  };
  
  const speak =(floor)=>{
  
  }
 
  const handleAction=(id)=>{
    switch (id) {
      case flags.hide_:
        //open for editing
        if (hideEditBar) {
          sethideEditBar(false);
        }else{
           sethideEditBar(true);
        }
        
        
        break;
      case flags.start_record:
        //start recording
        startRecording() ;


        break
      case flags.star_send :
        //generated image
        console.log("start sending")
        processinput(inputText)

        break    
    
      default:
        console.log("handle action",id);
        break;
    }
    
  }
  
  const startRecording = async ()=>{    
           try {          
              setactionSwitchIndicator(flags.start_record)
               await Voice.start('fr-FR')
           } catch (error) {
              console.log(error) ;
           }

    }

    const speechEndHandler =(e)=>{
          setactionSwitchIndicator(flags.end_record);    
          console.log("speech end",e)        
    }
  const speechResultsHandler = (e) => {
        const text = e.value[0];
        setInputText(text);
        sethideEditBar(null)
      };
  return(
    <View style={styles.container}>
         <StatusBar
             animated={true}
             backgroundColor="#61dafb"/>
          <FlatList
              data={chatHistory}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.chatContainer}
              ListEmptyComponent={<EmptyElement/>}
              renderItem={({ item }) => <ResponseBLoc item={item}/>}/>
          
            {hideEditBar?null:
            <View style={[styles.inputContainer]}>
            <TextInput
               style={[styles.inputText,{minHeight:100,flex:1,fontSize:16}]}
               placeholder="Posez une question ou discutez avec le bot..."
               value={inputText}
               multiline={true}                     
               onChangeText={(text)=>{
                   setInputText(text)                  
                   if(text!=null && text!=""){
                       setactionSwitchIndicator(1)                    
                   }else{                   
                    setactionSwitchIndicator(0)
                   }
               }} />                
            </View>}
        
          {<ActionBar action ={handleAction}  indicator={actionSwitchIndicator}/> }
        
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
     margin:5,
     width:'90%',
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
  borderTopRightRadius:15,
  borderTopLeftRadius:15,
  padding:10,
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