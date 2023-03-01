import React from 'react'
import { View, Text, Pressable, TouchableOpacity, SafeAreaView } from 'react-native'
import { Colors } from './Constants'

export default function Newsfeed(props) {


  return (
    <SafeAreaView style={{ height: "100%", width: "100%" ,backgroundColor: Colors.trueBlack}}>

    
        <View style={{width:'100%', height:"100%", justifyContent: 'center', alignItems: 'center'}}>
              
                <Text style={{color: Colors.white, fontSize: 20}}>Newsfeed coming soon</Text>
            
        </View>


   </SafeAreaView>
  )
}
