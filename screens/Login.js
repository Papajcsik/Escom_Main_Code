import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native'
import { withSafeAreaInsets } from 'react-native-safe-area-context'
import { auth } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const Login = () => {

  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');

  const [loginListener, setLoginListener] = useState(false);

  const navigation= useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.replace("Home")
      }
    })
    return unsubscribe
  }, [loginListener])

  const move = () => {
    navigation.navigate("Register")
  }
 
  const handlelogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log("Logged in with:", user.email)
    }).catch(error=>alert(error.message))
    setLoginListener(!loginListener);
  }

  return (
    <KeyboardAvoidingView style={[styles.container,{backgroundColor: 'black'}]} behavior="padding">
      <View style={styles.inputContainer}>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlelogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={move} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
            </KeyboardAvoidingView>  )
}

export default Login

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
  backgroundColor: '#d50a0e',
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
})
