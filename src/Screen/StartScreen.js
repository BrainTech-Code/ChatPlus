import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import AppColor from '../constants/colors';
import AppConstant, { AppRoute } from '../constants/constants';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StartScreen = () =>{
   
   const navigate = useNavigation();
    

    useEffect(() =>{
        retrieveData();
     });
   
    

   
   

    const storeData = async () => {
         try {
         await AsyncStorage.setItem(
             AppConstant.firstSetup,
             "false",
          );
         } catch (error) {
            // Error saving data
         }
       };
    const retrieveData = async () => {
       try {
          const value = await AsyncStorage.getItem(AppConstant.firstSetup);
          console.log("values",value);
            if (value !== null) {            
                navigate.replace(AppRoute.drawer) 
             }else{
                storeData();
                setTimeout(()=>{navigate.replace(AppRoute.drawer)},5000 )
             }
            } catch (error) {
               
               // Error retrieving data
         }
       };

 return(
        <View style={styles.container} >
          <Text style={styles.title} >Bienvenue sur {AppConstant.APPName} </Text>
          <Text style={styles.subtile}> votre assistant intelligent </Text>
          <View style={styles.action}>
          <Progress.Bar indeterminate={true} width={200} color={AppColor.statusbarColor} />

          </View>
          <View style={styles.Footer2 }>
                <Text style={styles.signature}> @BrainTech2023:v1.0</Text>
          </View>
       </View>
     );}

export default StartScreen;
const styles = StyleSheet.create({
          container:{
            flex:1,
            justifyContent:'center',
            alignContent:'center',
            alignItems:'center'
          },
          title:{
            fontSize:42,
            color:AppColor.statusbarColor,
            margin:10
          },
          subtile:{
            fontSize:18
          },
          action:{
            margin:10,
            padding:10
          },
          Footer2:{
            marginTop:4,
          
          },
});
