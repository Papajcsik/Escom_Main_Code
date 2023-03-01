import React from 'react'
import { View, Text, Pressable, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native'
import { Colors, navigationImages } from './Constants'

export default function Blueprint(props) {
  
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" ,backgroundColor: Colors.trueBlack}}>
      <ImageBackground source={ navigationImages.tutorialBackground } style={{width:'100%', height:"100%", justifyContent: 'center', alignItems: 'center'}} >

        <View style={{width:'70%', height:"30%", justifyContent: 'center', alignItems: 'center', borderRadius: 10,backgroundColor: Colors.black}}>
              
                <Text style={{color: Colors.white, fontSize: 20, textAlign: 'center'}}>Blueprint Mode coming soon</Text>
                <TouchableOpacity style={{width:"60%", height:"30%", marginTop: 40,borderRadius: 10, borderColor: Colors.lightgrey, borderWidth:2, alignItems: 'center', justifyContent: 'center'}} onPress={() => {props.navigation.navigate('Welcome')}}>
                   <Text style={{color: Colors.white, fontSize: 20}}>Go back</Text>
                </TouchableOpacity>
            
        </View>

      </ImageBackground>
        
   </SafeAreaView>
  )
}
