import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import logo from "./assets/logo.png";
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from 'anonymous-files';

export default function App() {

  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted){
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickResult = await ImagePicker.launchImageLibraryAsync();
    if(pickResult.cancelled){
      return;
    }
    
    if(Platform.OS === 'web'){
      let remoteUri = await uploadToAnonymousFilesAsync(pickResult.uri);
      setSelectedImage({localUri: pickResult.uri, remoteUri});
    }else{
      setSelectedImage({localUri: pickResult.uri, remoteUri:null});
    }
  };

  let openShareDialogAsync = async () => {
    if(!(await Sharing.isAvailableAsync())){
      alert(`This image can be share with this link => ${selectedImage.remoteUri}`);
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  };

  if(selectedImage !== null){
    return (
      <View style={styles.container}>
        <Image source={selectedImage.localUri} style={styles.thumbnail}/>
        {/* <Image source={{uri: "http://i.imgur.com/TkIrScD.png"}} style={{width: 305, height: 159}}/> */}
        <Text style={styles.instructions}>Hello World !</Text>
        <TouchableOpacity
        onPress={openShareDialogAsync}
        style={styles.button}>
          <Text style={styles.buttonText}>Share this photo !</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return(
    <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
      <Text style={styles.instructions}>Hello World !</Text>
        <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}>
          <Text style={styles.buttonText}>Pick a photo !</Text>
        </TouchableOpacity>
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
    marginHorizontal: 15
  },
  logo:{
    width: 305,
    height: 159,
    marginBottom: 10
  },
  button:{
    backgroundColor: "blue",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 6
  },
  buttonText:{
    fontSize: 20,
    color:"#fff"
  },
  thumbnail:{
    width:300,
    height:300,
    resizeMode: "contain"
  }
});