import 'react-native-url-polyfill/auto';
import { View ,Text} from 'react-native';
import Home from './src/Screen/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './src/Components/DrawerContent';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Ionicons';
import AppColor from './src/constants/colors';

const shareOptions = {
  title: 'Share via',
  message: 'some message',
  url: 'some share url',
  social: Share.Social.WHATSAPP,
  whatsAppNumber: "9199999999",  // country code + phone number
  filename: 'test' , // only for base64 file in Android
};
const fun = async () => {
     try {
      const shareResponse = await Share.shareSingle(shareOptions);
     } catch (error) {
    // handle error
   }
  ;
}
const Drawer = createDrawerNavigator();

const MyDrawer=()=> {
  return (
   
    <Drawer.Navigator 
                     initialRouteName="home"
                     screenOptions={{}}
                     drawerContent={props=><DrawerContent {...props} />} >
      <Drawer.Screen name="home" component={Home} 
                 options={{drawerLabel:"Acceuil ",
                           drawerIcon:({})=><Icon name="home" size={28} color={AppColor.secondary} /> }}  />
      

      
    </Drawer.Navigator>
    
   
  );
}
const App=()=>{

 // console.log("secret",process.env.REACT_APP_OPENAI_API_KEY) ;
  return ( 
       <NavigationContainer><MyDrawer/></NavigationContainer>
    );
}
export default App;

