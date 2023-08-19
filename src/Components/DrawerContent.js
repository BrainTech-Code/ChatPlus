import React from 'react';
import { ImageBackground,StyleSheet,TouchableOpacity,Linking, Text, View } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';
import AppColor from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
const options ={
  message:"Telecharger ChatPlus , votre assistant intelligent",
  title:"partage par chatPlus",
  url:"https://play.google.com/store/apps/details?id=com.chatplus",
  email:null,
  recipient:null
  }  
const shareOptions = {
  title: 'Share via',
  message: 'Application ChatPlus interresant',
  url: null,
  social: Share.Social.WHATSAPP,
  whatsAppNumber: "+22672046657",  // country code + phone number
  filename: null,
};
const handleShared =()=>{
  
 }
const DrawerContent = (props)=>{
   const ShareApp=()=>{
    Share.open(options)
       .then((res) => {

       }).catch((err) => {
         console.log(err);
     });
     }
  const WatSapp= async () => {
    try {
      Linking.openURL('whatsapp://send?text=hello ChatPlus est cool&phone=+22672046657')
     //const shareResponse = await Share.shareSingle(shareOptions);
    } catch (error) {
   // handle error
  }
 ;
}
     return(

      <View style={{flex: 1}}>      
        <DrawerContentScrollView {...props} >
                <ImageBackground source={require("../assets/botmin.jpg")} style={{width:"100%",height:200}} >

                </ImageBackground>
                <DrawerItemList {...props} />
                
         </DrawerContentScrollView>
             <View style={styles.Footer }>
                 <View style={styles.Footer1 }>
                     <TouchableOpacity  style={styles.icon} onPress={ShareApp} ><Icon name="share-social-outline" size={30} color={AppColor.secondary} /></TouchableOpacity>
                     <TouchableOpacity style={styles.icon} onPress={WatSapp}><Icon name="logo-whatsapp" size={30} color={AppColor.secondary} /></TouchableOpacity>
                  </View>
                    <View style={styles.Footer2 }>
                       <Text style={styles.signature} > @BrainTech2023:v1.0</Text>
                  </View>
                 
              </View>

         </View> 
      );}

export default DrawerContent;
const styles = StyleSheet.create({
  Footer:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    borderTopWidth:2,
    borderColor:AppColor.primary,
  },
  Footer1:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  Footer2:{
    marginTop:4
  },
  icon:{
   marginHorizontal:15
  },
  signature:{
    color:AppColor.secondary_s
  }
});