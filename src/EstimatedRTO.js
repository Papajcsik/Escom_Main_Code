import React, { useState } from 'react'
import { View, Text, Pressable, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import { Colors, IMAGES } from './Constants'
import GlobalStyles from './GlobalStyles'
import { Modal } from 'react-native'

export default function EstimatedRTO(props) {


  return (
    <SafeAreaView style={GlobalStyles.container}>

      <View style={{width:'100%', height:'100%', alignItems: 'center', justifyContent: 'center'}}>

            <Text style={{color: Colors.white, fontSize: 20}}>Estimated RTO</Text>
            <br></br>      

            <TouchableOpacity style={{width:"60%", height:"10%", marginTop: 40,borderRadius: 10, borderColor: Colors.lightgrey, borderWidth:2, alignItems: 'center', justifyContent: 'center'}} onPress={() => props.navigation.navigate("Home") }>
              <Text style={{color: Colors.white, fontSize: 20}}>Go Back</Text>
            </TouchableOpacity>


      </View>

    </SafeAreaView>

  )
}
