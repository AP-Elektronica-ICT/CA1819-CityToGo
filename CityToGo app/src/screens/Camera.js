import React, { Component } from "react";
import { RNCamera } from 'react-native-camera';
import Config from '../config/config'

import { fetchRecognitionImage } from "../redux/actions/imageRecognitionAction";
import { connect } from "react-redux"

import {
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator
} from "react-native";

class Camera extends Component {

    render() {
        let { fetching } = this.props.imageRecognition;

        if (fetching) {
            return (
                <View style={styles.horizontal}>
                    <ActivityIndicator size="large" color="#454F63"/>
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
        }
    };

    getImageLabels = async (imageBase64) => {
        const { navigate } = this.props.navigation;

        this.props.fetchRecognitionImage(imageBase64)

        if (this.props.imageRecognition.data == "match")
            navigate('Home')
        else
            console.log(this.props.imageRecognition.data)
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

const mapStateToProps = state => {
    return {
        state: state,
        imageRecognition: state.imageRecognition
    }
}

export default connect(mapStateToProps, { fetchRecognitionImage })(Camera);