import React, { Component } from "react";
import { RNCamera } from 'react-native-camera';
import Config from '../config/config'

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
                <View style={styles.horizontal}>
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
 
            this.getImageLabels(data.base64)
            this.setState({ isLoading: true })
        }
    };

    getImageLabels = async (imageBase64) => {
        const { navigate } = this.props.navigation;

        fetch(`http://${Config.MY_IP_ADRES}:3000/api/getImageLabels`, {
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
                console.log(responseJson)
                this.setState({ isLoading: false })
                if (responseJson == "match")
                    navigate('Home')
            })
            .catch((error) => {
                console.error(error);
            });
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