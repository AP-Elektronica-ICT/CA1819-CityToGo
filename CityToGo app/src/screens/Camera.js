import React, { Component } from "react";
import { RNCamera } from 'react-native-camera';
import CameraModal from "../modals/CameraModal";

import { fetchRecognitionImage } from "../redux/actions/imageRecognitionAction";
import { connect } from "react-redux"

import {
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator
} from "react-native";

class Camera extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isFound: false,
            modalVisible: false
        }
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)

            this.props.fetchRecognitionImage(data.base64)
        }
    };


    takeAction() {
        const { navigate } = this.props.navigation;

        if (this.state.isFound)
            navigate('ARclass', { ARSceneName: 'ARPortal' })

        // navigate('Home')

    }

    componentDidUpdate(prevProps) {
        const { fetched, data } = this.props.imageRecognition;

        if (prevProps.imageRecognition.fetched !== fetched) {
            if (data == "match") {
                this.setState({
                    isFound: true,
                    modalVisible: true
                })
                console.log('match !!!!!!!!')
            }
            else {
                this.setState({
                    isFound: false,
                    modalVisible: true
                })
                console.log('not match !!!!!!!!')
            }

        }
    }

    render() {
        const { fetching, fetched } = this.props.imageRecognition;
        const { isFound } = this.state


        if (fetching) {
            return (
                <View style={styles.horizontal}>
                    <ActivityIndicator size="large" color="#454F63" />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <CameraModal
                    ref={ref => { this.CameraModal = ref; }}
                    isFound={isFound}
                    modalVisible={this.state.modalVisible}
                    onPress={() => {
                        this.setState({ modalVisible: false })
                        this.takeAction()
                    }}
                    onPressYes={() => this.setState({ modalVisible: false })}
                />
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
                            onPress={() => this.takePicture()}
                            style={styles.capture}
                        >
                        </TouchableOpacity>
                    </View>
                </RNCamera>


            </View>
        );
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