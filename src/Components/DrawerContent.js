import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';

const DrawerContent = (props) =>{
   

     return(
        <DrawerContentScrollView {...props}>
                <ImageBackground source={require("../assets/bot.jpg")} style={{width:"100%",height:200}} >

                </ImageBackground>
                <DrawerItemList {...props} />
         </DrawerContentScrollView>
      );}

export default DrawerContent;
