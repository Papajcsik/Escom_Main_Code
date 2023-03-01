import React from 'react'
import { View, Text, Pressable, TouchableOpacity, SafeAreaView } from 'react-native'
import { Colors } from './Constants'

export default function Energy(props) {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" ,backgroundColor: Colors.black}}>

    
        <View style={{width:'100%', height:"100%", justifyContent: 'center', alignItems: 'center'}}>
              
                <Text style={{color: Colors.white, fontSize: 20}}>Energy Core coming soon</Text>
            
            <TouchableOpacity 
                style={{width:"60%", height:"15%", marginTop: 40,borderRadius: 10, borderColor: Colors.lightgrey, borderWidth:2, alignItems: 'center', justifyContent: 'center'}}
                onPress={() => {props.navigation.navigate('Home')}}>
                  
                  <Text style={{color: Colors.white, fontSize: 20}}>Go back</Text>
            </TouchableOpacity>
            
        </View>


   </SafeAreaView>
  )
}
