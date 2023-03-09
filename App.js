import 'react-native-url-polyfill/auto';
import { View ,Text} from 'react-native';
import Home from './src/Screen/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './src/Components/DrawerContent';

const Drawer = createDrawerNavigator();

const MyDrawer=()=> {
  return (
    <Drawer.Navigator 
                     initialRouteName="home"
                     screenOptions={{}}
                     drawerContent={props=><DrawerContent {...props} />} >
      <Drawer.Screen name="home" component={Home} />
      
    </Drawer.Navigator>
  );
}
const App=()=>{


  return ( 
       <NavigationContainer><MyDrawer/></NavigationContainer>
    );
}
export default App ;

