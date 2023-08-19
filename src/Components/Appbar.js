import React from 'react';
import { Text,StyleSheet,TouchableOpacity, View } from 'react-native';
import AppColor from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AppConstant, { AppRoute } from '../constants/constants';
import { useDrawerStatus,getDrawerStatusFromState } from '@react-navigation/drawer';

const Appbar = ({navigation}) =>{

   const drawerStatus=useDrawerStatus();
   const handleDrawer=()=>{      
         if(drawerStatus==='open'){
            navigation.closeDrawer();
         }else{
            navigation.openDrawer();
         } ;
    }
    const whoIs=()=>{
        //  navigation.navigate(AppRoute.user);
    }

    return(
    <View style={styles.container} >
      <View style={styles.bar} >
        <TouchableOpacity onPress={handleDrawer}>
                <Icon name="menu" color={'white'} size={28}  />
        </TouchableOpacity>
        <Text style={{fontSize:18,
                       color:'white'}}>{AppConstant.APPName}</Text>
        </View>
       
    </View>
     )}

export default Appbar;
const styles = StyleSheet.create({
        container:{
         paddingTop:5,
         paddingHorizontal:5,
         backgroundColor:AppColor.statusbarColor,
         flexDirection:'row',justifyContent:'space-between'
        },
        bar:{
            flexDirection:'row',           
            padding:2, 
            alignContent:'center',
            alignItems: 'center',
            backgroundColor:AppColor.statusbarColor,
            height:40,           
        }
});