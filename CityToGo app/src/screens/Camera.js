import React, { Component } from "react";
import { RNCamera } from 'react-native-camera';

import {
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator
} from "react-native";

class Camera extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: false }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={ styles.horizontal}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
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

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data);

            this.getImageLabels(data.base64)
            this.setState({ isLoading: true })
        }
    };

    getImageLabels = async (imageBase64) => {
        fetch('http://192.168.1.35:3000/api/getImageLabels', {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + global.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: imageBase64
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                //console.log(responseJson)
                this.verificationMatch(responseJson)
                //console.log()
            })
            .catch((error) => {
                console.error(error);
            });
    }

    verificationMatch(responseJson) {
        const { params } = this.props.navigation.state;
        let monumentName = params.monumentProps.Naam
        console.log(params.monumentProps)

        responseJson.forEach(function(params) {
            console.log(params.description)
            if (params.description == monumentName){
                console.log("MATCH!!")
            }else
                console.log("NO MATCH")
        })

        
    }
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
    },
    horizontal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Camera;
//AppRegistry.registerComponent('Camera', () => Camera);