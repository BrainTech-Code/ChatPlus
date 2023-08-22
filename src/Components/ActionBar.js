import React from 'react';
import { View,LogBox, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import AppColor, { AppImage } from '../constants/colors';
import { flags } from '../constants/constants';


LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs()
const ActionBar = ({action, indicator}) => {
  let recordStyl={backgroundColor:AppColor.primary};

  const handleEdit = () => {
    action(flags.hide_)
  };

  const handleRecord = () => {
    // Votre logique pour l'enregistrement audio
    action(flags.start_record)
    recordStyl={backgroundColor:AppColor.primary}
  };
 const handleSend = ()=>{
   action(flags.star_send)
 }
 const handleAnime = ()=>{
     action(4)
 }
  const handleImage = () => {
    // Votre logique pour la génération d'image
  };
 console.log(indicator)
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleEdit}>
        <Animatable.View animation="bounceIn">
          <Icon name="pencil" size={30} color="#fff" style={styles.icon} />
        </Animatable.View>
      </TouchableOpacity>
      {(indicator==0 || indicator==flags.end_send_ind || indicator==flags.end_record)?
      <TouchableOpacity onPress={handleRecord}>
        <Animatable.View animation="bounceIn">
          <Icon name="mic" size={30} color="#fff" style={[styles.icon,recordStyl]} />
        </Animatable.View>
      </TouchableOpacity>:null

      }
      {
      (indicator==1)?
      <TouchableOpacity onPress={handleSend}>
        <Animatable.View animation="bounceIn">
          <Icon name="send" size={30} color={'white'} 
                style={[styles.icon,{backgroundColor:AppColor.primary}]} />
        </Animatable.View>
      </TouchableOpacity>:null
      }
      {
      (indicator==2 || indicator==flags.start_send_ind || indicator==flags.start_record)?
      <TouchableOpacity onPress={handleAnime}>
        <Animatable.View animation="bounceIn"> 
          <Image
             style={{ width: 30, height: 30,borderRadius:160 }}
             source={require('../assets/anim.gif')}
           />
        </Animatable.View>
      </TouchableOpacity>:null
      }
      
      
      <TouchableOpacity onPress={handleImage}>
        <Animatable.View animation="bounceIn">
          <Icon name="image" size={30} color="#fff" style={styles.icon} />
        </Animatable.View>
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: AppColor.primary_p,
    height: 50,
  },
  icon: {
    borderRadius: 160,
    borderWidth: 0,
    padding:5,
   
    backgroundColor:'rgba(255,255,255,0.5)',
   
  },
});

export default ActionBar;
