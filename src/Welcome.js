import React from 'react'
import { View, Text, Pressable, TouchableOpacity, SafeAreaView, ImageBackground, Image } from 'react-native'

import { Colors, IMAGES, Musics, navigationImages } from './Constants'
import GlobalStyles from './GlobalStyles'

import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'

export default function Welcome(props) {

  ///////////////////////////////////////////////////click sound

  const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( Musics.click );
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


  return (
    <SafeAreaView style={{ height: "100%", width: "100%" ,backgroundColor: Colors.trueBlack}}>

        <ImageBackground style={GlobalStyles.container} source={IMAGES.welcome_background}>

        <View style={{width:'100%', height:"100%", justifyContent: 'center', alignItems: 'center'}}>
              
                <Image source={ IMAGES.logo} style={{height:"35%", aspectRatio:1}}/>
                <Text style={{color: Colors.white, fontSize: 50, fontWeight: 'bold'}}>ESCOM</Text>

                <TouchableOpacity style={{height:"9%", aspectRatio:3.1, marginTop: 40}} onPress={() => {playSound(); props.navigation.navigate('Blueprint')}}>
                    <ImageBackground source={ navigationImages.tutorial } style={{aspectRatio:3, height:"100%",}} >
                       <View style={{height:"100%", width:"100%", alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[GlobalStyles.szoveg, {fontSize: 17, letterSpacing: 3.5, marginTop: 12, color: Colors.white }]}>Blueprint Mode</Text>
                        <Text style={[GlobalStyles.szoveg, {fontSize: 13, letterSpacing: 3.5, color: Colors.white}]}>Free Trial</Text>

                       </View>
                        
                    </ImageBackground>
                </TouchableOpacity>


                <TouchableOpacity style={{height:"12%", aspectRatio:2.8,marginTop: 50}} onPress={() => {playSound(); props.navigation.navigate('Login')}} >
                    <ImageBackground source={ navigationImages.signUp } style={{aspectRatio:3, height:"100%",}} >
                       <View style={{height:"100%", width:"100%", alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[GlobalStyles.szoveg, {fontSize: 17, letterSpacing: 3.5, marginTop: 25, color: Colors.white }]}>Contractor Mode</Text>
                        <Text style={[GlobalStyles.szoveg, {fontSize: 13, letterSpacing: 3.5,  color: Colors.white}]}>Sign Up!</Text>

                       </View>
                        
                    </ImageBackground>
                </TouchableOpacity>
            
        </View>

        </ImageBackground>
        
   </SafeAreaView>
  )
}
