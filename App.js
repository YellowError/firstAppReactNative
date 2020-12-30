import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from "./assets/logo.png";
import ButtonDialogAndShare from "./component/ButtonDialogAndShare"
import {openImagePickerAsync, openShareDialogAsync, clearImage} from "./helpers/pickerSystem"

export default function App() {

  const [selectedImage, setSelectedImage] = React.useState(null);

  if(selectedImage !== null){
    return (
      <View style={styles.container}>
        <Image source={{uri:selectedImage.localUri}} style={styles.thumbnail}/>
        {/* <Image source={{uri: "http://i.imgur.com/TkIrScD.png"}} style={{width: 305, height: 159}}/> */}
        <Text style={styles.instructions}>Do you want share this photo ?</Text>
        <View style={{display: "flex", flexDirection:"row"}}>
          <ButtonDialogAndShare 
          pressLogic={() => {openShareDialogAsync(selectedImage)}}
          >
            Share
          </ButtonDialogAndShare>
          <ButtonDialogAndShare 
          pressLogic={() => {clearImage(setSelectedImage)}}
          color="red"
          >
            Clear Image
          </ButtonDialogAndShare>
        </View>
      </View>
    );
  }

  return(
    <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
      <Text style={styles.instructions}>Hello World !</Text>
      <ButtonDialogAndShare 
      pressLogic={() => {openImagePickerAsync(setSelectedImage)}}
      >
        Pick a photo !
      </ButtonDialogAndShare>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions:{
    color: "#888",
    fontSize: 18,
    textTransform:"uppercase",
    marginHorizontal: 15,
    marginBottom: 10
  },
  logo:{
    width: 305,
    height: 159,
    marginBottom: 10
  },
  thumbnail:{
    width:300,
    height:300,
    resizeMode: "contain"
  }
});
