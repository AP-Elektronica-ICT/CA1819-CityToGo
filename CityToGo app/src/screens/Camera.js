import React, { Component } from "react";
import { RNCamera } from 'react-native-camera';

import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
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
                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                </View>
                </RNCamera>
            </View>
        );
    }

    takePicture = async function () {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
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
//AppRegistry.registerComponent('Camera', () => Camera);