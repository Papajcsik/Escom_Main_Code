
import { NavigationContainer, useFocusEffect, useLinkProps } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Image, ImageComponent, StyleSheet, TabBarIOSItem, Text, View } from 'react-native';
import { Colors, Musics, navigationImages } from './src/Constants';

import { Blueprint, BottomSheet, Cyber, EstimatedRTO, HomePage, Leaderboard, Newsfeed, Shop, Users, Weaponry, Welcome } from './src';
import Draft from './src/Draft';
import Armory from './src/Armory';
import Login from './screens/Login';
import Register from './screens/Register';


import { useEffect, useState } from 'react';
import Energy from './src/Energy';
import { Audio } from 'expo-av';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const HomeStack = () => {
  return(

      <Tab.Navigator initialRouteName='Shop'
            screenOptions={({ route }) => ({
              tabBarIcon: ({focused, color, size}) => {
                
                if(route.name === 'Home1')
                {
                  return focused ?
                      <Image source={navigationImages.home_aktiv} style={{height:"85%", aspectRatio:1}}/>:
                      <Image source={navigationImages.home_inaktiv} style={{height:"85%", aspectRatio:1}}/>
                }
                else if(route.name === 'Newsfeed')
                {
                  return focused ?
                      <Image source={navigationImages.newsfeed_aktiv} style={{height:"85%", aspectRatio:1}}/>:
                      <Image source={navigationImages.newsfeed_inaktiv} style={{height:"85%", aspectRatio:1}}/>
                }
                else if(route.name === 'Leaderboard')
                {
                  return focused ?
                      <Image source={navigationImages.leaderboard_aktiv} style={{height:"85%", aspectRatio:1}}/>:
                      <Image source={navigationImages.leaderboard_inaktiv} style={{height:"85%", aspectRatio:1}}/>
                }
                else if(route.name === 'Draft')
                {
                  return focused ?
                      <Image source={navigationImages.draft_aktiv} style={{height:"85%", aspectRatio:1}}/>:
                      <Image source={navigationImages.draft_inaktiv} style={{height:"85%", aspectRatio:1}}/>
                }
                else if(route.name === 'Shop')
                {
                  return focused ?
                      <Image source={navigationImages.shop_aktiv} style={{height:"85%", aspectRatio:1}}/>:
                      <Image source={navigationImages.shop_inaktiv} style={{height:"85%", aspectRatio:1}}/>
                }

                return null;
              },

              tabBarStyle:{ backgroundColor: Colors.darkPurple, position: 'relative', height: "10%" },
              tabBarActiveBackgroundColor:Colors.darkPurple,
              tabBarActiveTintColor:"#000",
              tabBarShowLabel: false,
              headerShown: false,
              
            })}
          
          >
          
            <Tab.Screen name='Home1' component={HomePage}  />
            <Tab.Screen name='Newsfeed' component={Newsfeed} />
            <Tab.Screen name='Leaderboard' component={Leaderboard} />
            <Tab.Screen name='Draft' component={Draft} />
            <Tab.Screen name='Shop' component={Shop} />

      </Tab.Navigator>    
  );
};

export default function App() {

  ///////////////////////////////////////////background music
    const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/Music/Background_music_(Extrahuman).mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

 //useEffect(()=>{playSound()},[]);   //main music on off

  return (
    
    <NavigationContainer style={{backgroundColor:Colors.trueBlack }}>

      <Stack.Navigator initialRouteName='Welcome' 
        screenOptions={({ route }) => ({
        headerShown: false,
         })}
           >

          <Stack.Screen name="Welcome" component={Welcome}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>

          <Stack.Screen name='Blueprint' component={Blueprint}/>

          <Stack.Screen name='Home' component={HomeStack}/>

          <Stack.Screen name='Armory' component={Armory}/>
          <Stack.Screen name='Energy' component={Energy}/>
          <Stack.Screen name='Weaponry' component={Weaponry}/>
          <Stack.Screen name='Cyber' component={Cyber}/>

          <Stack.Screen name='Users' component={Users}/>
          <Stack.Screen name='EstimatedRTO' component={EstimatedRTO}/>

      </Stack.Navigator>
      
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
