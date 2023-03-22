import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, TouchableOpacity, Image, SafeAreaView, ImageBackground, StatusBar, Dimensions, Modal } from 'react-native'
import BottomSheet from './BottomSheet';
import { Colors, IMAGES, navigationImages } from './Constants'
import { collection, getDocs, doc, getDoc, onSnapshot} from 'firebase/firestore'
import { auth, db} from '../firebase'
import GlobalStyles from './GlobalStyles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';



export default function HomePage(props) {

    
    /////////////////////////////////////////escoin data

    const userRef = collection(db, "users");
    const [users, setUsers] = useState([]);
    const user = doc(db, "users", auth.currentUser.uid);
    const [ escoinListener, setEscoinListener ] = useState(false);

    const[escoin,SetEscoin] = useState(0);

    useEffect(() => {

        const unsubscribe = (user => {
            if(user){
              navigation.replace("Home")
            }
          })
      const getUsers = async () =>{
      const data = await getDocs(userRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      const userSnap = await getDoc(user)

      
      console.log("penis", userSnap.data().Escoins)
      SetEscoin(userSnap.data().Escoins)

      };
    getUsers();

    }, []);

    
    //////////////////////////////////////////////////////constants

    var height = Dimensions.get('window').height;
    var width = Dimensions.get('window').width;

    const profile = "../assets/images/avatar.png";

    const estimatedRTO = "1.500";

  return (
   <SafeAreaView style={{width:"100%", height:"100%", borderWidth:0, backgroundColor: Colors.trueBlack, }}>
        <StatusBar style="dark" />

    <View style={{height: "15%", width:"100%", borderColor: Colors.white, borderWidth: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
       
        <View style={{height: "100%", width: "45%", borderColor: Colors.blue, borderWidth: 0, alignItems: 'center',flexDirection: 'row',  paddingLeft: "4%", paddingRight: "4%"  }}>
            <View style={{borderWidth: 3, borderColor: Colors.purple, borderRadius: 50, height:"65%", aspectRatio: 1, marginRight: "8%" }}>

                <TouchableOpacity onPress={()=>{props.navigation.navigate('Users')}} style={{height:"100%", width:"100%", borderWidth:0, borderColor: Colors.white, borderRadius: 50}}>
                    <Image source={IMAGES.escoin_image} style={{height:"100%", width:"100%", borderRadius: 50}}/>
                </TouchableOpacity>

            </View>

            <View style={{width:"45%", height:"35%",justifyContent: 'space-evenly', borderColor: Colors.white, borderWidth:0, flexDirection: 'row', alignSelf: 'center', alignItems: 'center' , marginTop: height * 0.01, paddingLeft:"3%"  }}>
                <Text style={{fontSize: height * 0.025, color: Colors.white, fontWeight: 'bold', alignSelf:'center' , borderColor: Colors.white, borderWidth:0, }}>
                {users.filter((val)=>{if(val.id == auth.currentUser.uid){return val}}).map((user) => 
                {
                return <View key={user.id}> 
                    <Text>{user.Escoins}</Text>
                </View> 
                } )}
                </Text>
                
                <Image source={IMAGES.escoin_image} style={{height:"85%", aspectRatio:1, borderColor: Colors.white, borderWidth:0,}} />
            </View>
            
        </View>

        <View style={{height: "94%", width:"55%", borderColor: Colors.purple, borderWidth: 0, flexDirection: 'row-reverse' }}>
            <View style={{height: "100%", aspectRatio:2.1, borderColor: Colors.white, borderWidth: 0, alignItems: 'center', justifyContent: 'center'}}>
           <TouchableOpacity onPress={()=>{props.navigation.navigate('EstimatedRTO')}} style={{height: "100%", width:"100%", borderWidth: 0, borderColor: Colors.white}}>
                <ImageBackground source={IMAGES.estimatedRTO_image} style={{height:"100%", width:"100%",alignItems: 'center', justifyContent: 'center' }} resizeMode="stretch">
                    <Text style={{color:Colors.white, fontSize: height * 0.02, fontWeight: 'bold' }}>
                        Estimated RTO
                    </Text>

                    <Text style={{color:Colors.white, fontSize:height * 0.028, fontWeight: 'bold', textAlign: 'center' }}>
                        {estimatedRTO}
                    </Text>

                </ImageBackground>
            </TouchableOpacity>
            </View>
        </View>
        
    </View>

    <View style={{width:"100%", height:"87%" , borderWidth: 0, borderColor: Colors.blue, alignItems: 'center'}}>
    <ImageBackground source={IMAGES.home_background}
     style={{height: "96%", width:"100%", alignSelf: 'center',bottom: "-2%", justifyContent: 'flex-end', borderWidth: 0, borderColor: Colors.purple}}>
            
            <BottomSheet escoin={escoin} props={props} />
    
    </ImageBackground>
               
        
        
        
    
    

    </View>



    
   
   </SafeAreaView>
  )
}

