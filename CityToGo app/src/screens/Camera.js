import React, { Component } from "react";
import { RNCamera } from 'react-native-camera';

import {
    StyleSheet,
    TouchableOpacity,
    View,
    AppRegistry
} from "react-native";



class Camera extends Component {
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={(ref) => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    //flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                >
                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
                        <TouchableOpacity
                            onPress={this.takePicture.bind(this)}
                            style={styles.capture}
                        >
                        </TouchableOpacity>
                    </View>
                </RNCamera>
            </View>
        );
    }

    // getVisionLabels = async (base64Image) => {
    //     fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB4HgIDhaV6sv3ddo_Xol9r4fDLj7RpOaU'), {
    //         method: 'POST',
    //         body: {
    //             "requests": [
    //                 {
    //                     "image": {
    //                         "content": base64Image
    //                     },
    //                     "features": [
    //                         {
    //                             "type": "LABEL_DETECTION"
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     }.then((response) => response.json())
    //         .then((responseJson) => {
    //             console.log("this is vision labels")
    //             console.log(responseJson)
    //         })
    //         .catch((error) => {
    //             debugger
    //             console.error(error);
    //         });

    // }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data);
            //this.getVisionLabels(data.base64)
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        margin: 20,
        borderWidth: 6,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 85,
        height: 85,
        backgroundColor: '#fff',
        borderRadius: 100,
    }
});

export default Camera;
AppRegistry.registerComponent('Camera', () => Camera);