import React, { useState, useEffect } from 'react'
import { StyleSheet,TouchableOpacity, Text } from 'react-native'

function ButtonDialogAndShare({pressLogic, children, color}) {
    const [nStyle, setNStyles] = useState(null);
    useEffect(() => {
        setNStyles(StyleSheet.create({
            button:{
                backgroundColor: color || "blue",
                paddingVertical: 20,
                paddingHorizontal: 30,
                borderRadius: 6,
                marginBottom: 10
              },
              buttonText:{
                fontSize: 20,
                color:"#fff",
                textTransform: "uppercase"
              } 
        }))
    },[])
    if(nStyle !== null){
        
        return (
            <TouchableOpacity
            onPress={pressLogic}
            style={nStyle.button}
            >
                <Text style={nStyle.buttonText}>
                    {children}
                </Text>
            </TouchableOpacity>
        )
    }else{
        return (<Text> </Text>)
    }
}
// const ScopedStyles = StyleSheet.create({
//     button:{
//         backgroundColor: "blue",
//         paddingVertical: 20,
//         paddingHorizontal: 30,
//         borderRadius: 6
//       },
//       buttonText:{
//         fontSize: 20,
//         color:"#fff",
//         textTransform: "uppercase"
//       }
// })

export default ButtonDialogAndShare
