import React from 'react'
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import { View,
          Text,
          TouchableOpacity,
          Image,
          SafeAreaView,
          StyleSheet,
          Pressable,
          Dimensions,
          } from 'react-native'
import { ImageBackground, Modal } from 'react-native';
import { Colors, IMAGES, ArmorImages, Musics, WeaponImages } from './Constants'
import GlobalStyles from './GlobalStyles';
import { Audio } from 'expo-av';

export default function Weaponry(props) {

 const height = Dimensions.get('window').height;

    const [megoldas, setMegoldas] = useState( ["a","b","c","d","e","f","g"] );                       //megoldas

  const [jelenlegi, setJelenlegi] = useState([ null, null, null, null, null, null, null ]);                     //beirt kod
  const [szinesJelenlegi, setSzinesJelenlegi] = useState([]);        //kopizott beiras szinesen
  const [superiorJelenlegi, setSuperiorJelenlegi] = useState([ null, null, null, null, null, null, null ]);     //green lock a beirasnal

  const [modalState, setModalState] = useState(false);                 //modal lathatosag
  const [losingModalState, setModalLosingState] = useState(false);      //vesztettel modal lathatosag
  const [resetGameModalState, setResetGameModalState] = useState(false); //escoin resetter
  const [giveUpModalState, setGiveUpModalState] = useState(false);      //Are you sure screen

  const [newGameListener, setNewGameListener] = useState(false);
  const [analyzeListener, setAnalyzeListener] = useState(false);
  const [bgMusicListener, setBgMusicListener] = useState(false);      //bg music one time switch

  const [ShuffledLetters, setSHuffledLetters] = useState(
    ["a","b","c","d",
     "e","f","g","h",
     "i","j","k","l",
     "m","n","o","s",]);


  const [escoin, setEscoin] = useState(10);
  const [dumpingTomb, setDumpingTomb] = useState([ null, null, null, null, null, null, null ]);

////////////////////////////////////////////////////////////music

   const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../assets/Music/TunePocket-Colossus.mp3')
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


const musicPlayer = () => {
  if(!bgMusicListener)                                //run only once
  {
    setBgMusicListener(true);

    playSound();

  }
};

/////////////////////////////////////////////////////////asset counter

const [assetObjectArray, setAssetObjectArray] = useState([
  {name: "a", count: 6},
  {name: "b", count: 6},
  {name: "c", count: 6},
  {name: "d", count: 6},

  {name: "e", count: 6},
  {name: "f", count: 6},
  {name: "g", count: 6},
  {name: "h", count: 6},

  {name: "i", count: 6},
  {name: "j", count: 6},
  {name: "k", count: 6},
  {name: "l", count: 6},

  {name: "m", count: 6},
  {name: "n", count: 6},
  {name: "o", count: 6},
  {name: "s", count: 6},
]);

////////////////////////////////////////////////////////////////resource dumping

let counterSubtractor;

useEffect(() => {

 counterSubtractor = 0;          //megszamoljuk a kulonbseget
  
  superiorJelenlegi.map((elem, i) => {
    
    if( elem !== dumpingTomb[i] && elem !== null )
    {
      counterSubtractor++;
    }
  })
  console.log("counterSubtractor: " + counterSubtractor);


  for( var f=0; f < assetObjectArray.length; f++ )
  {
    for(var g=0; g < counterSubtractor; g++)
    {
      if(assetObjectArray[f].count !== 0)
      {
        assetObjectArray[f].count--;
      }
    } 
  }
  setAssetObjectArray([... assetObjectArray]);
    console.log(assetObjectArray);

    for(var j=0; j < superiorJelenlegi.length; j++)     //masolas
    {
      dumpingTomb[j] = superiorJelenlegi[j];
    }
    setDumpingTomb([... dumpingTomb]);
    console.log( "dumpingTomb: " + dumpingTomb)

  }, [analyzeListener])

/////////////////////////////////////////////////////////////////random megoldas

useEffect(() => {

   console.log("Uj Jatek");
  if(escoin <= 0)
  {
    setResetGameModalState(true);
  }
 

  console.log("keverem a betuket " + ShuffledLetters);

    // for(var i=0; i < ShuffledLetters.length; i++)
    // {
    //   var tempLetter = ShuffledLetters[i];
    //   var randomIndex = Math.floor(Math.random() * ShuffledLetters.length);
    //   ShuffledLetters[i] = ShuffledLetters[randomIndex];
    //   ShuffledLetters[randomIndex] = tempLetter;
    // }
    // console.log("megkevert betuk " + ShuffledLetters);

    //  for(var j=0; j < megoldas.length; j++)                            //random megoldas ki/be kapcsolas
    //   {
    //      megoldas[j] = ShuffledLetters[j];
    //   }
    //  setMegoldas([... megoldas]);

    /////////////////////////////////////////////////////////////// experiment -- duplicate shuffeling

      var randomIndex = 0;
      
      for(var l=0; l<7; l++)
      {
        randomIndex = Math.floor(Math.random() * ShuffledLetters.length);
        megoldas[l] = ShuffledLetters[randomIndex];
      }
      setMegoldas([...megoldas]);



  console.log("a kevert Megoldas " + megoldas);

}, [newGameListener])

///////////////////////////////////////////////////////////////timer
  
  const ido = 65000;                                 //kezdo ido milisec-ben // ez 120 000 === 2 perc

  const [time, setTime] = useState(ido);                
  const [timerON, setTimerOn] = useState(false);      // szamol e vagy sem

  useEffect(() => {                                     //szamlaluk az idot
   
    // let interval = null;

    // if(timerON)
    // {
    //     interval = setInterval(() => {
    //         setTime(prevTime => prevTime - 10);           // 10ms minusz minden 10ms-nal
    //     }, 10);
        
    // } else {
    //   clearInterval(interval);
    // }
    
    // return () => clearInterval(interval);

    ////////////////////////////////////////////////////////////other timer

    
    if(timerON)
    {
      setTimeout(() => {
        
        setTime( time - 1000 );
      }, 1000);

    }

    return;


  }, [timerON, time])

  useEffect(() => {                                     //figyeljuk vesztett e
    if(time === 0 || time <= 0)
  {
    setTime(0);                                     //timer bug // not solved
    setTimerOn(false);
    setModalLosingState(true);

  }
  },[time])

  /////////////////////////////////////////////////////// green Lock BG color

  // useEffect(() => {

  //   const greenLockBGColor = (elem, iteracio) => {     

  //     if()
  //     {

  //     }
  //     return colors.opacityBlue;
  //   };

  // }, [analyzeListener])
  

///////////////////////////////////////////////////////////////gombok

  function KeyboardHandler(parameter, assetNumber) {

    
    if (jelenlegi.length <= megoldas.length && assetObjectArray[assetNumber].count > 0) 
    {
      for(var i=0; i < megoldas.length; i++)
      {
        if(superiorJelenlegi[i] === null && jelenlegi[i] === null)
        {
          jelenlegi[i] = parameter;
          setJelenlegi([... jelenlegi ]);
      
          assetObjectArray[assetNumber].count--;
          setAssetObjectArray([... assetObjectArray]);

          console.log("jelenlegi: " + jelenlegi);
          console.log("superiorJelenlegi " + superiorJelenlegi);
          return;
        }
      }
    }
    return;
  }

  ///////////////////////////////////////////////clear and analyze gomb
  //////////////////////////////////////////////////////////////////////////

  var lastElementIndex;

  const handleClear = () => {
    if(true)
    {
      //  let lastElement = jelenlegi.length - 1;
      jelenlegi.push(null);

      
       for(var m=0; jelenlegi[m] !== null || m === 6; m++ )
          {
            if(m >= 6)
            {
              lastElementIndex = 6;
            }
            if(m < 6)
            {
              lastElementIndex = m;
            } 
          }
          console.log("jelenlegi utolso eleme: " + lastElementIndex);

        if( jelenlegi[lastElementIndex] !== null && superiorJelenlegi[lastElementIndex] === null )   //ha nincs fixalva igy torol
          {
            for(var k=0; k < assetObjectArray.length; k++ )                 //asset++
            {
              if( jelenlegi[lastElementIndex] === assetObjectArray[k].name )
              {
                  assetObjectArray[k].count++;
              }
            }

            jelenlegi[lastElementIndex] = null;
            jelenlegi.pop();//
            setJelenlegi([... jelenlegi]);

            console.log("jelenlegi: " + jelenlegi);
            console.log("superiorJelenlegi " + superiorJelenlegi);
            console.log("nem fixalt torles");
                        console.log("jelenlegi utolso elemenek indexe: " + lastElementIndex);

            return;
          }
                      console.log("nem fixalt torles --hiba");

          for( var p=lastElementIndex; p >= 0; p-- )            //ez esetben fixalt
          {
            if( jelenlegi[p] !== null && superiorJelenlegi[p] === null )   
            {
              for(var h=0; h < assetObjectArray.length; h++ )       //asset++
              {
                if( jelenlegi[p] === assetObjectArray[h].name )
                {
                    assetObjectArray[h].count++;
                }
              }
              jelenlegi[p] = null;
              jelenlegi.pop();
              setJelenlegi([... jelenlegi]);

              console.log("jelenelgi: " + jelenlegi);
            console.log("superiorJelenlegi " + superiorJelenlegi);
            console.log("Fixalt torles");

              return;
            }
          }
   
    }
    console.log("nem volt torles");
    jelenlegi.pop();

    return;
  }

  const handleAnalyze = () => {
    if(jelenlegi[0] !== null && 
       jelenlegi[1] !== null &&
       jelenlegi[2] !== null &&
       jelenlegi[3] !== null &&
       jelenlegi[4] !== null &&
       jelenlegi[5] !== null &&
       jelenlegi[6] !== null )
     {
        console.log("zajlik az anal"); 

        musicPlayer();                      //music - 1 time run

        setTimerOn(false);                             //idoleallitas
        let szamlalo = 0;

        for(var i = 0; i < megoldas.length ; i++)
        {
          if(megoldas[i] === jelenlegi[i])
          {
            szamlalo++
            console.log(szamlalo);
          }
          if(szamlalo === 7)
          {
            console.log("nyertel");

            for(var n = 0; n < jelenlegi.length; n++)       //masolas
            {
              szinesJelenlegi[n] = jelenlegi[n];
            }
            setSzinesJelenlegi([... szinesJelenlegi]);

            setModalState(true);

            return;
          }
        }
        jelenlegi.map((elem, i) => {
          
          if(megoldas.includes(elem))
          {
            console.log(elem + " van benne")

                if(elem !== megoldas[i])                      //narancssargara hozzaadni resource-t
                {
                  console.log("resource pumping");

                  for(var t=0; t < assetObjectArray.length; t++)
                  {
                    
                     if(assetObjectArray[t].name === elem)
                    {
                      
                      assetObjectArray[t].count++;
                      setAssetObjectArray(assetObjectArray);
                      
                    }
                  }
                }
          }
          if(jelenlegi[i] === megoldas[i])
          {
            superiorJelenlegi[i] = jelenlegi[i];             //superiorJelenlegi beiras

            console.log(i+1 + ".-edik mezot eltalatad");
          }
        })
        setSuperiorJelenlegi([... superiorJelenlegi]);

        for(var n = 0; n < jelenlegi.length; n++)       //masolas
        {
          szinesJelenlegi[n] = jelenlegi[n];
        }
        setSzinesJelenlegi([... szinesJelenlegi]);
          console.log("masolat: " + szinesJelenlegi);

        for(var j=0; j < megoldas.length; j++)        
        {
          jelenlegi[j] = null;
          
          if(superiorJelenlegi[j] !== null)
          {
            jelenlegi[j] = superiorJelenlegi[j];
          }
        }
        setJelenlegi([... jelenlegi]);
        setAnalyzeListener( !analyzeListener );

        setTimerOn(true);

        console.log("BESZOPTAD")
        console.log("A megoldas: " + megoldas);
        console.log("Amit te vittel be: " + jelenlegi);

        console.log("jelenlegi: " + jelenlegi);
        console.log("superiorJelenlegi " + superiorJelenlegi);

      }

    return;
  } 


  ///////////////////////////////////////////////////gomb hatterszin

  const getBackGroundColor = (element, i) => {
        
    if(element === megoldas[i])
    {
      return Colors.primary;
    }
    if(megoldas.includes(element))
    {
      return Colors.secondary;
    }
    return Colors.opacityBlue;
  };

///////////////////////////////////////modal closing

  const closeModal = () => {
                                            
    setNewGameListener([!newGameListener]);         //megoldas randomizalas
    setModalState(false);
    setModalLosingState(false);
    setResetGameModalState(false);
    setGiveUpModalState(false);
      setTimerOn(false);

      setTime(ido);          //idonullazas
    
    for(var j = 0; j < 7; j++)       //nullazas       
    {
      jelenlegi[j] = null;
      superiorJelenlegi[j] = null;
      szinesJelenlegi.pop();
    }
    setJelenlegi([... jelenlegi]);              //refresh
    setSuperiorJelenlegi([... superiorJelenlegi]);
    setSzinesJelenlegi([...szinesJelenlegi]);

    for(var i = 0; i < assetObjectArray.length; i++)    //re-set every asset to 4
    {
      assetObjectArray[i].count = 6;
    }
    setAssetObjectArray([... assetObjectArray]);        //refresh

    return;
  };

/////////////////////////////////////////////////////////////reset Game

const resetGame = () => {

  closeModal();
  setEscoin(1);

  return;
};


////////////////////////////////////////////button Background Color on counter (grey)

const getButtonBackGroundColor = (parameter) => {

  if(assetObjectArray[parameter].count === 0)
  {
    return Colors.opacityGrey;
  }
  return Colors.opacityBlue;
};

//////////////////////////////////////////button Background color on counter (grey) ANALYZE

const getAnalyzeBackgroundColor = () => {

  if(jelenlegi.includes(null))
  {
    return Colors.opacityGrey;
  }
  return Colors.opacityBlue;
};


/////////////////////////hatterkep

const backgroundImage = require('../gombok/Weaponry/escom-mobil-gombokuj-nagy-hatter-weaponry.png');

  return (
    <SafeAreaView style={GlobalStyles.container}>

    <ImageBackground source={backgroundImage} style={GlobalStyles.backGroundImage} resizeMode="cover">
      <View style={{borderWidth: 0, borderColor: Colors.white, height: "8%", flexDirection: 'row',  alignItems:'center', justifyContent: 'space-between' }}>

         <View style={{position: 'relative',  height: "100%", aspectRatio: 1.4, justifyContent: 'center', paddingLeft: "5%" ,borderWidth: 0, borderColor: Colors.white}}>
          <TouchableOpacity onPress={() => {setGiveUpModalState(true)}} style={{borderColor: Colors.red, borderWidth: 1, height: "50%", width:"50%", alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color:Colors.white, alignSelf: 'center', fontSize:"4.5vW", textAlign: 'center'}}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", aspectRatio: 3,}}>
            <Text style={[GlobalStyles.szoveg, { paddingTop:"2%", }]} >WEAPON</Text>
          <Text style={[GlobalStyles.szoveg,]} >DEPARTMENT</Text>
        </View>

        
        <View style={{position: 'relative', height: "100%", aspectRatio: 1.4, borderWidth: 0, justifyContent: 'flex-start', borderColor: Colors.white, }}>
            
          <View style={{borderColor: Colors.red, borderWidth: 2, backgroundColor: Colors.black, alignItems: 'center', justifyContent: 'center', height: "80%", paddingLeft: "2%", }}>
            <Text 
              style={{color: Colors.white, fontSize: "7.2vw",}}>
                {( "0" + Math.floor((time / 60000) % 60)).slice(-2)}:{( "0" + Math.floor((time / 1000) % 60)).slice(-2)}
            </Text>
          </View>
              
        </View>


      </View>

      <Modal transparent={true} visible={modalState} animationType={'fade'} >
        <View style={[GlobalStyles.modal]} >
         <View 
         style={{ elevation: 10, zIndex: 10, backgroundColor: Colors.black, flex: 1, width: "100%", height: "60%", maxHeight: "40%", maxWidth: 250, 
          justifyContent: 'center', borderRadius: 10, borderColor: Colors.darkgrey, borderWidth: 1}}>

            <Text style={{ fontWeight: 'bold', letterSpacing: 6, fontSize: 20, color: Colors.white, alignSelf: 'center' }}>You Win</Text>
            <Text style={GlobalStyles.modalText}>Tying again <br></br> costs 1 ESCoin</Text>
              <TouchableOpacity style={[GlobalStyles.modalButton, {marginTop:14}]} onPress={() => {props.navigation.navigate('Home'); closeModal()  }}>
                <Text style={GlobalStyles.modalText}>Go Home</Text>  
              </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={losingModalState} animationType={'fade'} >
        <View style={[GlobalStyles.modal]} >
         <View
          style={{ elevation: 10, zIndex: 10, backgroundColor: Colors.black, flex: 1, width: "100%", height: "60%", maxHeight: "40%", maxWidth: 250,
             justifyContent: 'center', borderRadius: 10, borderColor: Colors.darkgrey, borderWidth: 1}}>

            <Text style={{ fontWeight: 'bold', letterSpacing: 6, fontSize: 20, color: Colors.white, alignSelf: 'center' }}>You Lose</Text>
            <Text style={GlobalStyles.modalText}>Tying again <br></br> costs 1 ESCoin</Text>
              
              <TouchableOpacity style={[GlobalStyles.modalButton, {marginTop:14}]} onPress={() => {props.navigation.navigate('Home'); closeModal()  }}>
                <Text style={GlobalStyles.modalText}>Go Home</Text>  
              </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={resetGameModalState} animationType={'fade'} >
        <View style={[GlobalStyles.modal]} >
         <View 
         style={{ elevation: 10, zIndex: 10, backgroundColor: Colors.black, flex: 1, width: "100%", height: "60%", maxHeight: "40%", maxWidth: 250, 
          justifyContent: 'center', borderRadius: 10, borderColor: Colors.darkgrey, borderWidth: 1}}>

            <Text style={{ fontWeight: 'bold', letterSpacing: 6, fontSize: 20, color: Colors.white, alignSelf: 'center', textAlign: 'center' }}>You're out of <br></br>ESCoin's</Text>
            <Text style={[GlobalStyles.modalText, {marginTop:10}]}>Buy more to <br></br>play again</Text>
              <TouchableOpacity style={[GlobalStyles.modalButton, {marginTop:12}]} onPress={() => {props.navigation.navigate('Home');}}>
                <Text style={GlobalStyles.modalText}>Sorry, I'm poor</Text>  
              </TouchableOpacity>
              <TouchableOpacity style={[GlobalStyles.modalButton, {marginTop:10}]} onPress={() => {resetGame()}}>
                <Text style={GlobalStyles.modalText}>Buy 1 & Play</Text>  
              </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={giveUpModalState} animationType={'fade'} >
        <View style={[GlobalStyles.modal]} >
         <View 
         style={{ elevation: 10, zIndex: 10, backgroundColor: Colors.black, flex: 1, width: "100%", height: "60%", maxHeight: "40%", maxWidth: 250, 
          justifyContent: 'center', borderRadius: 10, borderColor: Colors.darkgrey, borderWidth: 1}}>

            <Text style={{ fontWeight: 'bold', letterSpacing: 6, fontSize: 20, color: Colors.white, alignSelf: 'center', textAlign: 'center' }}>Are you Sure?</Text>
            <Text style={GlobalStyles.modalText}>Don't be a loser</Text>
              <TouchableOpacity style={[GlobalStyles.modalButton, {marginTop: 25}]} onPress={() => {setGiveUpModalState(false)}}>
                <Text style={GlobalStyles.modalText}>Continue!</Text>  
              </TouchableOpacity>
              <TouchableOpacity style={[GlobalStyles.modalButton, {marginTop: 12}]} onPress={() => {props.navigation.navigate('Home'); closeModal()  }}>
                <Text style={GlobalStyles.modalText}>Give up</Text>  
              </TouchableOpacity>
          </View>
        </View>
      </Modal>



      <View style={GlobalStyles.felsoKeret}>
      
        <View style={[GlobalStyles.szinezettGomsorKeret, {height:"50%", justifyContent: 'center'}]} >
              {szinesJelenlegi.map((element, i) => (
                <View
                  style={[GlobalStyles.felsoIrkaloButtonKeret_Weaponry, GlobalStyles.shadowProp,
                  {backgroundColor: getBackGroundColor(element, i), borderColor: Colors.red,}
                  ]}>
                  {
                    element === 'a' ? 
                        <Image source={WeaponImages.gomb1} key={"A"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'b' ?
                        <Image source={WeaponImages.gomb2} key={"B"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'c' ? 
                        <Image source={WeaponImages.gomb3} key={"C"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'd' ?
                        <Image source={WeaponImages.gomb4} key={"D"} style={GlobalStyles.felsoGombKepek}></Image> :
                    
                    element === 'e' ? 
                        <Image source={WeaponImages.gomb5} key={"E"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'f' ?
                        <Image source={WeaponImages.gomb6} key={"F"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'g' ? 
                        <Image source={WeaponImages.gomb7} key={"G"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'h' ?
                        <Image source={WeaponImages.gomb8} key={"H"} style={GlobalStyles.felsoGombKepek}></Image> :
                    
                    element === 'i' ? 
                        <Image source={WeaponImages.gomb9} key={"I"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'j' ?
                        <Image source={WeaponImages.gomb10} key={"J"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'k' ? 
                        <Image source={WeaponImages.gomb11} key={"K"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'l' ?
                        <Image source={WeaponImages.gomb12} key={"L"} style={GlobalStyles.felsoGombKepek}></Image> :
                    
                    element === 'm' ? 
                        <Image source={WeaponImages.gomb13} key={"M"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'n' ?
                        <Image source={WeaponImages.gomb14} key={"N"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'o' ? 
                        <Image source={WeaponImages.gomb15} key={"O"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 's' ?
                        <Image source={WeaponImages.gomb16} key={"S"} style={GlobalStyles.felsoGombKepek}></Image> :
                    
                      null
                  }
                </View>
              ))}
            </View> 

          <View >

          </View>

          <View style={[GlobalStyles.felsoGombSorKeret,{height:"50%", justifyContent: 'center'}]} >
            {jelenlegi.map((element, i) => (
              <View
                style={[GlobalStyles.felsoIrkaloButtonKeret_Weaponry,  GlobalStyles.shadowProp,
                {backgroundColor: Colors.opacityBlue,borderColor: Colors.red,}
                ]}>
                {
                   element === 'a' ? 
                        <Image source={WeaponImages.gomb1} key={"A"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'b' ?
                        <Image source={WeaponImages.gomb2} key={"B"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'c' ? 
                        <Image source={WeaponImages.gomb3} key={"C"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'd' ?
                        <Image source={WeaponImages.gomb4} key={"D"} style={GlobalStyles.felsoGombKepek}></Image> :
                    
                    element === 'e' ? 
                        <Image source={WeaponImages.gomb5} key={"E"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'f' ?
                        <Image source={WeaponImages.gomb6} key={"F"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'g' ? 
                        <Image source={WeaponImages.gomb7} key={"G"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'h' ?
                        <Image source={WeaponImages.gomb8} key={"H"} style={GlobalStyles.felsoGombKepek}></Image> :
                    
                    element === 'i' ? 
                        <Image source={WeaponImages.gomb9} key={"I"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'j' ?
                        <Image source={WeaponImages.gomb10} key={"J"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'k' ? 
                        <Image source={WeaponImages.gomb11} key={"K"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'l' ?
                        <Image source={WeaponImages.gomb12} key={"L"} style={GlobalStyles.felsoGombKepek}></Image> :
                    
                    element === 'm' ? 
                        <Image source={WeaponImages.gomb13} key={"M"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'n' ?
                        <Image source={WeaponImages.gomb14} key={"N"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 'o' ? 
                        <Image source={WeaponImages.gomb15} key={"O"} style={GlobalStyles.felsoGombKepek}></Image> :
                    element === 's' ?
                        <Image source={WeaponImages.gomb16} key={"S"} style={GlobalStyles.felsoGombKepek}></Image> :
                    
                  element === null ?
                      <View style={{width:"100%", height:"100%", color: Colors.opacityBlue}}></View> :
                    null
                }
              </View>
            ))}
          </View>


        
      </View>

      <View style={{borderColor: Colors.white, borderWidth: 0,  height: "47.4%", aspectRatio: 1, justifyContent: 'flex-end', justifyContent: 'flex-end', alignSelf: 'center' }}>
        
        <View style={GlobalStyles.billentyuzetKeret} >

          
          <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
            <Pressable onPress={() => {KeyboardHandler("a", 0)}} style={GlobalStyles.gombok} title="A">
              <Text style={GlobalStyles.assetCounter}>{assetObjectArray[0].count}</Text>
              <Image source={WeaponImages.gomb1} style={GlobalStyles.gombKepek}></Image>
              <View style={{backgroundColor: getButtonBackGroundColor(0), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
            </Pressable>
          </View>
          <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
            <Pressable onPress={() => {KeyboardHandler("b", 1)}} style={GlobalStyles.gombok} title="B">
              <Text style={GlobalStyles.assetCounter}>{assetObjectArray[1].count}</Text>
              <Image source={WeaponImages.gomb2} style={GlobalStyles.gombKepek}></Image>
              <View style={{backgroundColor: getButtonBackGroundColor(1), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
            </Pressable>
          </View>
          <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
            <Pressable onPress={() => {KeyboardHandler("c", 2)}} style={GlobalStyles.gombok} title="C">
              <Text style={GlobalStyles.assetCounter}>{assetObjectArray[2].count}</Text>
              <Image source={WeaponImages.gomb3} style={GlobalStyles.gombKepek}></Image>
              <View style={{backgroundColor: getButtonBackGroundColor(2), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
            </Pressable>
          </View>
          <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
            <Pressable onPress={() => {KeyboardHandler("d", 3)}} style={GlobalStyles.gombok} title="D">
              <Text style={GlobalStyles.assetCounter}>{assetObjectArray[3].count}</Text>
              <Image source={WeaponImages.gomb4} style={GlobalStyles.gombKepek}></Image>
              <View style={{backgroundColor: getButtonBackGroundColor(3), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
            </Pressable>
          </View>


        </View>
        
        <View style={GlobalStyles.billentyuzetKeret} >

          <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
            <Pressable onPress={() => {KeyboardHandler("e", 4)}} style={GlobalStyles.gombok} title="E">
              <Text style={GlobalStyles.assetCounter}>{assetObjectArray[4].count}</Text>
              <Image source={WeaponImages.gomb5} style={GlobalStyles.gombKepek}></Image>
              <View style={{backgroundColor: getButtonBackGroundColor(4), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
            </Pressable>
          </View>
          <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
            <Pressable onPress={() => {KeyboardHandler("f", 5)}} style={GlobalStyles.gombok} title="F">
              <Text style={GlobalStyles.assetCounter}>{assetObjectArray[5].count}</Text>
              <Image source={WeaponImages.gomb6} style={GlobalStyles.gombKepek}></Image>
              <View style={{backgroundColor: getButtonBackGroundColor(5), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
            </Pressable>
          </View>
          <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
            <Pressable onPress={() => {KeyboardHandler("g", 6)}} style={GlobalStyles.gombok}title="G">
              <Text style={GlobalStyles.assetCounter}>{assetObjectArray[6].count}</Text>
              <Image source={WeaponImages.gomb7} style={GlobalStyles.gombKepek}></Image>
              <View style={{backgroundColor: getButtonBackGroundColor(6), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
            </Pressable>
          </View>
          <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
            <Pressable onPress={() => {KeyboardHandler("h", 7)}} style={GlobalStyles.gombok} title="H">
              <Text style={GlobalStyles.assetCounter}>{assetObjectArray[7].count}</Text>
              <Image source={WeaponImages.gomb8} style={GlobalStyles.gombKepek}></Image>
              <View style={{backgroundColor: getButtonBackGroundColor(7), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
            </Pressable>
          </View>

      </View>

      <View style={GlobalStyles.billentyuzetKeret} >

        <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
          <Pressable onPress={() => {KeyboardHandler("i", 8)}} style={GlobalStyles.gombok} title="I">
            <Text style={GlobalStyles.assetCounter}>{assetObjectArray[8].count}</Text>
            <Image source={WeaponImages.gomb9} style={GlobalStyles.gombKepek}></Image>
            <View style={{backgroundColor: getButtonBackGroundColor(8), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
          </Pressable>
        </View>
        <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
          <Pressable onPress={() => {KeyboardHandler("j", 9)}} style={GlobalStyles.gombok} title="J">
            <Text style={GlobalStyles.assetCounter}>{assetObjectArray[9].count}</Text>
            <Image source={WeaponImages.gomb10} style={GlobalStyles.gombKepek}></Image>
            <View style={{backgroundColor: getButtonBackGroundColor(9), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
          </Pressable>
        </View>
        <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
          <Pressable onPress={() => {KeyboardHandler("k", 10)}} style={GlobalStyles.gombok}title="K">
            <Text style={GlobalStyles.assetCounter}>{assetObjectArray[10].count}</Text>
            <Image source={WeaponImages.gomb11} style={GlobalStyles.gombKepek}></Image>
            <View style={{backgroundColor: getButtonBackGroundColor(10), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
          </Pressable>
        </View>
        <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
          <Pressable onPress={() => {KeyboardHandler("l", 11)}} style={GlobalStyles.gombok} title="L">
            <Text style={GlobalStyles.assetCounter}>{assetObjectArray[11].count}</Text>
            <Image source={WeaponImages.gomb12} style={GlobalStyles.gombKepek}></Image>
            <View style={{backgroundColor: getButtonBackGroundColor(11), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
          </Pressable>
        </View>

      </View>

      <View style={GlobalStyles.billentyuzetKeret} >

        <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
          <Pressable onPress={() => {KeyboardHandler("m", 12)}} style={GlobalStyles.gombok} title="M">
            <Text style={GlobalStyles.assetCounter}>{assetObjectArray[12].count}</Text>
            <Image source={WeaponImages.gomb13} style={GlobalStyles.gombKepek}></Image>
            <View style={{backgroundColor: getButtonBackGroundColor(12), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
          </Pressable>
        </View>
        <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
          <Pressable onPress={() => {KeyboardHandler("n", 13)}} style={GlobalStyles.gombok} title="N">
            <Text style={GlobalStyles.assetCounter}>{assetObjectArray[13].count}</Text>
            <Image source={WeaponImages.gomb14} style={GlobalStyles.gombKepek}></Image>
            <View style={{backgroundColor: getButtonBackGroundColor(13), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
          </Pressable>
        </View>
        <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
          <Pressable onPress={() => {KeyboardHandler("o", 14)}} style={GlobalStyles.gombok}title="O">
            <Text style={GlobalStyles.assetCounter}>{assetObjectArray[14].count}</Text>
            <Image source={WeaponImages.gomb15} style={GlobalStyles.gombKepek}></Image>
            <View style={{backgroundColor: getButtonBackGroundColor(14), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
          </Pressable>
        </View>
        <View style={[GlobalStyles.gombKeret, {borderColor: Colors.red,}]}>
          <Pressable onPress={() => {KeyboardHandler("s", 15)}} style={GlobalStyles.gombok} title="S">
            <Text style={GlobalStyles.assetCounter}>{assetObjectArray[15].count}</Text>
            <Image source={WeaponImages.gomb16} style={GlobalStyles.gombKepek}></Image>
            <View style={{backgroundColor: getButtonBackGroundColor(15), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
          </Pressable>
        </View>

      </View>

      </View>

      <View style={GlobalStyles.alsoKeret} >
        <View style={{ height: "90%", aspectRatio: 4, flexDirection: 'row', alignItems: 'center', borderWidth: 0, borderColor: Colors.white}} >   

          <View style={GlobalStyles.clearGombKeret}>
            <TouchableOpacity onPress={handleClear} style={GlobalStyles.alsoGombok} title="CLEAR">
              <Image source={ArmorImages.gombClear} style={GlobalStyles.alsoGombKepek}/>
            </TouchableOpacity>
          </View>

          <View style={GlobalStyles.analyzeGombKeret}>
            <TouchableOpacity onPress={handleAnalyze} style={GlobalStyles.alsoGombok} title="ANALYZE">
              <Image source={ArmorImages.gombAnalyze} style={GlobalStyles.alsoGombKepek}/>
              <View style={{backgroundColor: getAnalyzeBackgroundColor(), width: "100%", height:"100%", position: 'absolute', zIndex: 22 }}></View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    


    </ImageBackground>
    

   </SafeAreaView>
  )
}
