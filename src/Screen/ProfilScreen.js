import React, { useState } from 'react';
import { Text,StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import AppColor from '../constants/colors';

const ProfilScreen = () => {
    const [user, setuser] = useState(null);
    return(
    <View style={styles.container}>
         <View style={styles.container1} >
            <TouchableOpacity><Icon name="md-person-circle-outline" size={120} /></TouchableOpacity>
            <Text style={styles.name} >ProfilScreen</Text>
         </View>
        
    </View>
);}

export default ProfilScreen;
const styles = StyleSheet.create({
        container:{
            flex:1,
            
            
           
        },
        container1:{
            justifyContent:'center',
            alignItems:'center',
            height:'40%',
            color:'white',
          backgroundColor: AppColor.statusbarColor
        } ,
        name:{
            fontSize:20,
            fontWeight:'bold'
        }
});
