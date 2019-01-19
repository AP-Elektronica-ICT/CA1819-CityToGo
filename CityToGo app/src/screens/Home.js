//#region Imports
import React, { Component, } from "react";
import { View, StyleSheet, } from "react-native";
import SInfo from "react-native-sensitive-info";
import Maps from "./Maps";
import MonumentModal from "../modals/MonumentModal"
import StopModal from "../modals/StopModal";

import Quiz_popUp from "./Quiz_popup";
import randomLocation from 'random-location';
import geolib from "geolib";
import Config from '../config/config'
import { PRIMARY, SECONDARY, WHITE } from "../styles/Colors";

//Redux
import { monument } from '../redux/actions/monumentAction'
import { location } from '../redux/actions/currentLocationAction'
import { getUserSession, postUserSession, createUserSubsession } from "../redux/actions/userSessionAction";
import { connect } from "react-redux";


import { CardSection } from "./../common"
import { Button_White } from "./../common/Button_White"
import { CustomShortButton } from "../common/CustomShortButton"

import { PermissionsAndroid } from 'react-native';

//#endregion
const LATITUDE = 0;
const LONGITUDE = 0;
var currentLocation;
const R = 500;
var center;
var distanceToCheckpoint;
var distanceToQuiz;
var stral;

class Home extends Component {
    //#region Constructor
    constructor(props) {
        super(props);
        this.Quiz = this.getQuizpopup.bind(this);
        this.CreateSubSession = this.CreateSubSession.bind(this);

        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            polygonMonument: [],
            monumentsProps: [],
            isStartPopupVisible: false,
            quiz_visible: false,
            data: "https://41z6h24c86pu1h3m6x151ecm-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/miketyson-11-272x439.jpg",
            Name: "",
            polygons: [],
            randomQuizes: [],
            showMonument: false,
            checkLat: 0,
            checkLong: 0,
            cameraTrigger: 0,
            subSession: [],
            blurpercentage: 5,
            canShowCheckpointPhoto: false,
            isCurrentSessionStarted: false,
            modalStartButtonVisible: false,

            markers: [{
                coordinate: { latitude: 45.013, longitude: -122.6749817 },
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Berchem_Basiliek3.JPG/220px-Berchem_Basiliek3.JPG",
                title: "Franciscanessenklooster"
            }]
        };
    }
    componentDidMount() {

        SInfo.getItem("accessTokenServer", {}).then(accessToken => {
            global.token = accessToken
            console.log(global.token)
        })

    }

    componentDidUpdate(prevProps) {
        const { fetched, monument } = this.props.monumentState;

        if (prevProps.monumentState.fetched !== fetched) {

            this.mapPolygon(monument)
            this.setState({
                allMonument: monument,
                monumentsProps: monument.properties,
                polygons: monument.geometry.coordinates[0],
                monumentImageUrl: monument.properties.imageUrl,
                monumentName: monument.properties.Naam
                // Name: monument.properties.imageUrl,
                // Name: monument.properties.Naam,
                // isStartPopupVisible: true,
                //  isCurrentSessionStarted: true
            })

            //  this.refs.refMonumentModal.setModalVisible(true);
            //  this.getRandomQuizes();
        }

    }

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'CityToGo',
                    'message': 'CityToGo needs access to your location ' +
                        'so you can explore your city.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
                this.props.location();
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    componentWillMount() {

        this.requestLocationPermission()

    }


    Quiz = () => {
        //button click handler.
    }

    generateRandomint(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomQuizes() {
        const { fetched, monument } = this.props.monumentState;
        const { latitude, longitude } = this.props.currentLocationState.coords;

        let arr = []
        let randomNumber = 0

        const polygons = monument.geometry.coordinates[0];

        currentLocation = { latitude: latitude, longitude: longitude }

        //middenpunt tussen bestemming en huidige locatie 
        center = geolib.getCenter([
            { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
            { latitude: parseFloat(polygons[1][1]), longitude: parseFloat(polygons[1][0]) }]);

        //Afstand tussen bestemming en huidgie locatie 
        distanceToCheckpoint = randomLocation.distance(currentLocation, { latitude: parseFloat(polygons[1][1]), longitude: parseFloat(polygons[1][0]) })


        //Deze props worden gebruikt om Checkpoint op bepaalde afstand van gebruiker klikbaar te maken.
        this.setState({ checkLat: polygons[1][1], checkLong: polygons[1][0], cameraTrigger: parseInt(distanceToCheckpoint) })

        //Grootte van de circle waar Quizes gegenereerd worden
        stral = parseInt(distanceToCheckpoint) / 3;
        //Aantal Quizes worden getoond op basis van afstand tot checkpoint .
        if (parseInt(distanceToCheckpoint) < 1000) {
            randomNumber = this.generateRandomint(2, 4)
        }
        else {
            randomNumber = this.generateRandomint(4, 7)
            console.log('randomNumber !!!!!!!!!!!!!!')
            console.log(randomNumber)
        }

        // Random Quizes worden in een array gestoken
        for (let i = 0; i < parseInt(randomNumber); i++) {
            var randomPoints = randomLocation.randomCirclePoint(center, stral)
            arr.push(randomPoints);
        }
        this.setState({ randomQuizes: arr })
        //debugger

    }

    getQuizpopup = async (lat, long) => {
        const { navigate } = this.props.navigation;
        distanceToQuiz = randomLocation.distance(currentLocation, { latitude: parseFloat(lat), longitude: parseFloat(long) })
        console.log("Distance to this quiz is " + parseInt(distanceToQuiz) + " meters")
        if (parseInt(distanceToQuiz) < 300) {
            console.log("Quiz unlocked")
            navigate('ARclass', {ARSceneName: 'ARQuiz'})
            //this.setState({ quiz_visible: true });
           // this.refs.quizchild.setModalVisible(this.state.quiz_visible);
        }
    }

    ShowMonument = () => {
        this.getVisitedMonuments();
        this.setState({ showMonument: true })

    }

    mapPolygon(responseJson) {
        const polygon = responseJson.geometry.coordinates[0].map(coordsArr => {
            let coords = {
                latitude: coordsArr[1],
                longitude: coordsArr[0],
            }
            return coords;
        });

        this.setState({ polygonMonument: polygon })
    }


    CreateSubSession() {
        // let userProfielData = this.props.navigation.getParam("userData");
        //console.log(this.state.subSession)
        const { fetched, monument } = this.props.monumentState;

        let startTime = new Date().valueOf()

        let arr = []
        arr = this.state.subSession
        arr.push(
            {
                startTime: startTime,
                stopTime: 0,
                isFound: true,
                monument: monument
            }
        )
        this.props.createUserSubsession(arr, this.state.sessionId)


        // fetch(`http://${Config.MY_IP_ADRES}:3000/api/v1/userSession/update/${this.state.sessionId}`, {
        //     method: 'PUT',
        //     headers: {
        //         authorization: 'Bearer ' + global.token,
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({

        //         subSession: arr
        //     }),
        // }).then((response) => response.json()).then((responseJson) => {
        //     console.log(responseJson);
        // }
        // )
        //     .catch((error) => {
        //         console.error(error);
        //     });



    }

    getVisitedMonuments() {

        let userProfielData = this.props.navigation.getParam("userData");
        let arr = []
        let userID = userProfielData.sub
        console.log(userID);

        // this.props.getUserSession(userID)

        // console.log('from home print user session')
        // if (this.props.getUserSession.fetched)
        //     console.log(this.props.getUserSession.data[0].isRunning)

        fetch(`http://${Config.MY_IP_ADRES}:3000/api/v1/userSession/find/${userID}`)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                for (let z of responseJson) {

                    for (let k of z.subSession) {
                        if (z._id == this.state.sessionId) {
                            if (k.isFound == false) {

                                //console.log(z.subSession.monument.geometry)

                                arr.push(

                                    {
                                        coordinate: {
                                            latitude: k.monument.geometry.coordinates[0][0][1],
                                            longitude: k.monument.geometry.coordinates[0][0][0],
                                        },
                                        title: `${k.monument.properties.Naam}`,
                                        image: `${k.monument.properties.imageUrl}`,
                                    }
                                )
                            }
                        }

                    }


                }

                this.setState({ markers: arr });
                console.log(this.state.markers)

            }
            ).catch((error) => {
                console.error(error);
            });
    }



    startSession() {
        const { monument } = this.props.monumentState;
        console.log('START')

        let userProfielData = this.props.navigation.getParam("userData");
        let userId = userProfielData.sub
        let time = new Date().valueOf()

        this.getRandomQuizes();
        this.props.postUserSession(userId, true, time, 0, false, monument)
        this.refs.refMonumentModal.setModalVisible(false)
        this.setState({ isCurrentSessionStarted: true })
    }

    stopSession() {
        const { _id } = this.props.postUserSessionState.response
        this.props.createUserSubsession(false, _id)
        this.setState({ isCurrentSessionStarted: false })
        this.refs.refStopModal.setModalVisible(false)

    }

    getMonument() {
        const { latitude, longitude } = this.props.currentLocationState.coords;

        this.props.monument(latitude, longitude);
    }






    renderStartStopButton() {
        const { isCurrentSessionStarted } = this.state

        if (!isCurrentSessionStarted) {
            return (
                <View >
                    <CustomShortButton
                        color={PRIMARY}
                        heightIcon={34}
                        widthIcon={34}
                        children={require('./../assets/icons/Play.png')}
                        onPress={() => {
                            this.getMonument()
                            this.setState({ modalStartButtonVisible: true })
                            this.refs.refMonumentModal.setModalVisible(true);
                        }} />
                </View>
            )
        } else {
            return (
                <View>
                    <CustomShortButton
                        color={WHITE}
                        heightIcon={30}
                        widthIcon={30}
                        children={require('./../assets/icons/Museum.png')}
                        onPress={() => {
                            this.setState({ modalStartButtonVisible: false })
                            this.refs.refMonumentModal.setModalVisible(true)
                        }
                        }
                    />

                    <CustomShortButton
                        color={SECONDARY}
                        heightIcon={34}
                        widthIcon={34}
                        children={require('./../assets/icons/stop.png')}
                        onPress={() => {

                            this.refs.refStopModal.setModalVisible(true)
                        }}
                    />
                </View>
            )
        }
    }

    // renderCheckPointPhoto() {
    //     if (this.state.canShowCheckpointPhoto == true) {
    //         return (
    //             <View >
    //             </View>

    //         )

    //     }
    // }



    render() {

        const userProfielData = this.props.navigation.getParam("userData");
        const { navigate } = this.props.navigation;
        const { fetched, monument } = this.props.monumentState;

        return (
            <View style={styles.container}>
                <Maps
                    navigate={navigate}
                    currentLocation={this.props.currentLocationState}
                    getRandom={this.state.randomQuizes}
                    getPolygons={this.state.polygonMonument}
                    triggerCamera={this.state.cameraTrigger}
                    lat={this.state.checkLat}
                    long={this.state.checkLong}
                    getMonumentProps={monument.properties}
                    Quiz2={this.Quiz}
                    getmarker={this.state.markers}
                    monumentVisibility={this.state.showMonument}
                    profilePic={userProfielData.picture}
                    isCurrentSessionStarted ={this.state.isCurrentSessionStarted}
                />


                {/* <View >

                    <Button
                        onPress={() => this.ShowMonument()}
                        buttonStyle={styles.buttonStyle}
                        title={"Show visited monuments"}
                    />
                    <Button
                        onPress={() => navigate('ListSubSessions', { sessionId: this.state.sessionId, UserId: this.props.navigation.getParam("userData") })}
                        buttonStyle={styles.buttonStyle}
                        title={"Show SubSessions"}
                    />
                </View> */}

                <StopModal
                    ref='refStopModal'

                    onPress={() => this.stopSession()}

                />

                <MonumentModal
                    ref='refMonumentModal'
                    imageUrl={this.state.monumentImageUrl}
                    // blur={this.state.blurpercentage}
                    monumentName={this.state.monumentName}
                    onPress={() => this.startSession()}
                    modalContentVisible={fetched}
                    modalStartButtonVisible={this.state.modalStartButtonVisible}
                />

                <Quiz_popUp ref='quizchild'
                    imageUri={this.state.data}
                    data={this.state.Name}
                />
                <View style={styles.buttonsContainer}>

                    <View style={styles.buttonsGroup1}>
                        {/* {this.renderCheckPointPhoto()} */}
                        {this.renderStartStopButton()}
                    </View>

                    <View style={styles.buttonsGroup2}>
                        <Button_White children={require('./../assets/icons/Person.png')} onPress={() => navigate('Profile', { sessionId: this.state.sessionId })}></Button_White>
                        <Button_White children={require('./../assets/icons/loc.png')} ></Button_White>
                    </View>


                </View>

            </View >
        );



    }
    //#endregion
}
//#region  Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'flex-end',
        alignItems: 'stretch'
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'flex-end'
    },
    buttonsGroup1: {
        flexDirection: 'column',
        marginLeft: 14,
        marginBottom: 14,

    },
    buttonsGroup2: {
        flexDirection: 'column',
        marginBottom: 14,
        marginRight: 14
    },
    buttonStyle: {
        backgroundColor: "rgba(51,204,0,1)",
        width: 200,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },

    avatar: {
        width: 55,
        height: 55,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white"
    },
    CheckpointPic: {
        width: 55,
        height: 55,
        borderRadius: 0,
        borderWidth: 4,
        borderColor: "white"
    }

});

function mapStateToProps(state) {
    return {
        currentLocationState: state.currentLocation,
        monumentState: state.monument,
        getUserSessionState: state.getUserSession,
        postUserSessionState: state.postUserSession,

    }
}

export default connect(mapStateToProps, {
    monument,
    location,
    getUserSession,
    postUserSession,
    createUserSubsession
})(Home)