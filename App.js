import 'react-native-url-polyfill/auto';
import { View ,Text} from 'react-native';
import Home from './src/Screen/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './src/Components/DrawerContent';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Ionicons';
import AppColor from './src/constants/colors';
import Appbar from './src/Components/Appbar';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './src/constants/constants';
import StartScreen from './src/Screen/StartScreen';
import ProfilScreen from './src/Screen/ProfilScreen';

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
const Stack = createStackNavigator();

const MyDrawer=()=> {
  return (
   
    <Drawer.Navigator 
                     initialRouteName="home"
                     screenOptions={{
                      header:({ navigation, route, options }) =><Appbar navigation={navigation} />
                     }}
                     drawerContent={props=><DrawerContent {...props} />} >
    <Drawer.Screen name="home" component={Home} 
                 options={{drawerLabel:"Acceuil ",
                           drawerIcon:({})=><Icon name="home" size={28} color={AppColor.secondary} /> }}  />
    <Drawer.Screen name="user" component={ProfilScreen} 
                 options={{drawerLabel:'', }}  />
      

      
    </Drawer.Navigator>
    
   
  );
}


const MyStack=()=>{
  return (
    <Stack.Navigator screenOptions={{
                   header:()=>null,
                   }}>
      <Stack.Screen name={AppRoute.startScreen} component={StartScreen} />
      <Stack.Screen name="drawer" component={MyDrawer}/>
    </Stack.Navigator>
  );
}
const App=()=>{

 // console.log("secret",process.env.REACT_APP_OPENAI_API_KEY) ;
  return ( 
       <NavigationContainer><MyStack/></NavigationContainer>
    );
}
export default App;

