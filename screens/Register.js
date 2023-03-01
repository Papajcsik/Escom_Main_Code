import { StyleSheet, Text, TouchableOpacity, View ,  Image, Platform} from 'react-native'
import React, { useEffect, useState, Component } from 'react'
import { KeyboardAvoidingView , Button, SafeAreaView} from 'react-native'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { TextInput } from 'react-native'
import { withSafeAreaInsets } from 'react-native-safe-area-context'
import { auth , db} from '../firebase'
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { setDoc, doc, Timestamp} from "firebase/firestore";
import { async } from '@firebase/util'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';





const Register = () => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [displayFName, setDisplayFName] = useState('');
    const [displayLName, setDisplayLName] = useState('');
    const[GameID, setGameID] = useState('');
    const [escoin,setEscoin] = useState(0);
    const [palyedGames,setPlayedGames] = useState(0);
    const [points,setPoints] = useState(0);



    const [image, setImage] = useState(null);


    const navigation= useNavigation();




    //Date
    const [mydate, setDate] = useState(new Date());
   const [displaymode, setMode] = useState('date');
   const [isDisplayDate, setShow] = useState(false);
   const changeSelectedDate = (event, selectedDate) => {
   const currentDate = selectedDate || mydate;
   setDate(currentDate);
};


const showMode = (currentMode) => {
   setShow(true);
   setMode(currentMode);
};
const displayDatepicker = () => {
   showMode('date');
};

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(user => {
          if(user){
            navigation.replace("Home")
          }
        })
        return unsubscribe
      }, [])

    const handleSignup= async() => {
        await createUserWithEmailAndPassword(auth,email, password)
       .then(userCredentials => { const user = userCredentials.user;
       console.log("Registered in with:",user.email);
     }).catch(error=> alert(error.message))
   await setDoc(doc(db, "users", auth.currentUser.uid), {
    First_name: displayFName,
    Last_name: displayLName,
    GameID: GameID,
    Date_of_Birth: mydate,
    Escoins: parseInt(escoin),
    Played: parseInt(palyedGames),
    Points: parseInt(points),
});
      
     }
   
  return (
    <KeyboardAvoidingView style={[styles.container, {backgroundColor: 'black'}]} behavior="padding">

<View style={styles.inputContainer}>

<TextInput placeholder="First name" 
         value={displayFName} onChangeText={text => setDisplayFName(text)} 
        style={styles.input}
        />


<TextInput placeholder="Last name" 
         value={displayLName} onChangeText={text => setDisplayLName(text)} 
        style={styles.input}
        />

<TextInput placeholder="GameID" 
         value={GameID} onChangeText={text => setGameID(text)} 
        style={styles.input}
        />
        
    

        <TextInput placeholder="Email" 
         value={email} onChangeText={text => SetEmail(text)} 
        style={styles.input}
        />

          <TextInput placeholder="Password" 
         value={password} onChangeText={text => SetPassword(text)} 
        style={styles.input}
        secureTextEntry
        />
      </View>
      <SafeAreaView style={styles.datePicker}>
      <View>
         <Button onPress={displayDatepicker} title="Enter your birthdate!" />
            </View>
               {isDisplayDate && (
                  <DateTimePicker
                     testID="dateTimePicker"
                     value={mydate}
                     mode={displaymode}
                     is24Hour={true}
                     display="default"
                     onChange={changeSelectedDate}
            />
         )}
      </SafeAreaView>
<View>
        <TouchableOpacity onPress={handleSignup} style={[styles.button, styles.buttonOutline]}>
          
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      inputContainer: {
        width: '80%',
    
      },
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center,'
    
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#d50a0e',
      borderWidth: 2,
    },
    buttonOutlineText: {
      color: '#d50a0e',
      fontWeight: '700',
      fontSize: 16,
    },
    datePicker: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      justifyContent: 'center',
      alignItems: 'center',

    }
})