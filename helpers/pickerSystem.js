import uploadToAnonymousFilesAsync from 'anonymous-files';
import * as Sharing from "expo-sharing";
import * as ImagePicker from 'expo-image-picker';
import { Platform } from "react-native";


export let openImagePickerAsync = async (setter) => {
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
      setter({localUri: pickResult.uri, remoteUri});
    }else{
      setter({localUri: pickResult.uri, remoteUri:null});
    }
  };

  export let openShareDialogAsync = async (selectedImage) => {
    if(!(await Sharing.isAvailableAsync())){
      alert(`This image can be share with this link => ${selectedImage.remoteUri}`);
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  };

  export let clearImage = (setter) => {
    setter(null);
  }