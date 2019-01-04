//#region Imports
import React, { Component, } from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity

} from "react-native";
import { Button } from 'react-native-elements'
import SInfo from "react-native-sensitive-info";
import Maps from "./Maps";
import ModalExample from "./popup"
import Quiz_popUp from "./Quiz_popup";
import randomLocation from 'random-location';
import geolib from "geolib";
import Config from '../config/config'

//Redux
import { monument } from '../redux/actions/monumentAction'
import { location } from '../redux/actions/currentLocationAction'
import { getUserSession, postUserSession } from "../redux/actions/userSessionAction";
import { connect } from "react-redux";

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
            randomNumber: 0,
            showMonument: false,
            checkLat: 0,
            checkLong: 0,
            cameraTrigger: 0,
            subSession: [],
            blurpercentage: 5,
            canShowCheckpointPhoto: false,





            markers: [{
                coordinate: { latitude: 45.013, longitude: -122.6749817 },
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Berchem_Basiliek3.JPG/220px-Berchem_Basiliek3.JPG",
                title: "Franciscanessenklooster"
            }]
        };
    }
    //#endregion
    //#region Default methodes
    componentDidMount() {



        //current localisation 
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;

                this.setState({
                    latitude,
                    longitude,
                });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

        SInfo.getItem("accessTokenServer", {}).then(accessToken => {
            global.token = accessToken
            console.log(global.token)
        })

        this.props.monument(
            51.2165,
            4.4056
        );


    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            error => alert(error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );

        this.props.location()


    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    //#endregion
    //#region  Quizes
    Quiz = () => {
        //button click handler.
    }
    generateRandomint(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomQuizes() {
        //Current location
        currentLocation = {
            latitude: this.props.currentLocationState.coords.latitude,
            longitude: this.props.currentLocationState.coords.longitude
        }

        //middenpunt tussen bestemming en huidige locatie 
        center = geolib.getCenter([
            { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
            { latitude: parseFloat(this.state.polygons[1][1]), longitude: parseFloat(this.state.polygons[1][0]) }]);

        //Afstand tussen bestemming en huidgie locatie 
        distanceToCheckpoint = randomLocation.distance(currentLocation, { latitude: parseFloat(this.state.polygons[1][1]), longitude: parseFloat(this.state.polygons[1][0]) })
        //Deze props worden gebruikt om Checkpoint op bepaalde afstand van gebruiker klikbaar te maken.
        this.setState({ checkLat: this.state.polygons[1][1], checkLong: this.state.polygons[1][0], cameraTrigger: parseInt(distanceToCheckpoint) })
        //Grootte van de circle waar Quizes gegenereerd worden
        stral = parseInt(distanceToCheckpoint) / 3;
        let arr = []

        //Aantal Quizes worden getoond op basis van afstand tot checkpoint .
        if (parseInt(distanceToCheckpoint) < 1000) {
            this.setState({ randomNumber: this.generateRandomint(2, 5) })
        }
        else {
            this.setState({ randomNumber: this.generateRandomint(4, 7) })
        }

        // Random Quizes worden in een array gestoken
        for (let i = 0; i < parseInt(this.state.randomNumber); i++) {
            var randomPoints = randomLocation.randomCirclePoint(center, stral)
            arr.push(randomPoints);
        }
        this.setState({ randomQuizes: arr })

    }
    getQuizpopup = async (lat, long) => {
        distanceToQuiz = randomLocation.distance(currentLocation, { latitude: parseFloat(lat), longitude: parseFloat(long) })
        console.log("Distance to this quiz is " + parseInt(distanceToQuiz) + " meters")
        if (parseInt(distanceToQuiz) < 100) {
            console.log("Quiz unlocked")
            this.setState({ quiz_visible: true });
            this.refs.quizchild.setModalVisible(this.state.quiz_visible);
        }
    }
    //#endregion
    //#region  Monuments
    ShowMonument = () => {
        this.getVisitedMonuments();
        this.setState({ showMonument: true })

    }
    getMonument = async () => {

        fetch(`http://${Config.MY_IP_ADRES}:3000/api/getNextLocation`, {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + global.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                latitude: String(this.props.currentLocationState.coords.latitude),
                longitude: String(this.props.currentLocationState.coords.longitude)
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson.properties)
                this.mapPolygon(responseJson)
                this.setState({
                    allMonument: responseJson,
                    monumentsProps: responseJson.properties,
                    polygons: responseJson.geometry.coordinates[0],
                    data: responseJson.properties.imageUrl,
                    Name: responseJson.properties.Naam,
                    Name: responseJson.properties.Naam,
                    isStartPopupVisible: true,
                    //polygons: responseJson.geometry.coordinates[0],
                    isStartBttnVisible: true
                })
                this.getRandomQuizes();
                this.refs.popupchild.setModalVisible(this.state.isStartPopupVisible, true);
            })
            .catch((error) => {
                console.error(error);
            });
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
        console.log(this.state.subSession)


        let startTime = new Date().valueOf()
        // let userId = userProfielData.sub

        let arr = []
        arr = this.state.subSession

        arr.push(
            {
                startTime: startTime,
                stopTime: 0,
                isFound: true,
                monument: this.state.allMonument
            }
        )



        fetch(`http://${Config.MY_IP_ADRES}:3000/api/v1/userSession/update/${this.state.sessionId}`, {
            method: 'PUT',
            headers: {
                authorization: 'Bearer ' + global.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                subSession: arr
            }),
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson);
        }
        )
            .catch((error) => {
                console.error(error);
            });



    }



    startGameSession() {
        let userProfielData = this.props.navigation.getParam("userData");
        let arr = [];

        let startTime = new Date().valueOf()
        let userId = userProfielData.sub

       // this.props.postUserSession(userId, true, startTime, 0, false, this.state.allMonument)

        fetch(`http://${Config.MY_IP_ADRES}:3000/api/v1/userSession/create`, {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + global.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                isRunning: true,
                subSession: {
                    startTime: startTime,
                    stopTime: 0,
                    isFound: false,
                    monument: this.state.allMonument
                }
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

            //    console.log(responseJson._id)
                this.setState({ sessionId: responseJson._id })
                arr.push(responseJson.subSession[0])
                this.setState({ subSession: arr })

            //    console.log(this.state.subSession)

            }
            ).catch((error) => {
                console.error(error);
            });

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
                            if (k.isFound == true) {

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
    //#endregion
    //#region  Start button 
    //shows the start popup
    showStartPopup() {
        this.getMonument()
    }

    renderStartButton() {
        if (this.state.isStartBttnVisible !== true) {
            return (
                <View style={styles.bottomStartView}>
                    <Button
                        onPress={() => { this.showStartPopup(); this.setState({ canShowCheckpointPhoto: true }) }}

                        buttonStyle={styles.buttonStyle}
                        title="Start"
                    />
                </View>
            )
        }
    }
    //#endregion
    //#region render

    renderCheckPointPhoto() {
        if (this.state.canShowCheckpointPhoto == true) {
            return (
                <View style={styles.CheckpointView}>
                    <TouchableOpacity onPress={() => this.refs.popupchild.setModalVisible(true, false)}>
                        <Image style={styles.CheckpointPic}
                            blurRadius={this.state.blurpercentage}
                            source={{ uri: this.state.data }} />
                    </TouchableOpacity>
                </View>

            )

        }
    }



    render() {

        const userProfielData = this.props.navigation.getParam("userData");
        const { navigate } = this.props.navigation;

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
                    getMonumentProps={this.state.monumentsProps}
                    Quiz2={this.Quiz}
                    getmarker={this.state.markers}
                    monumentVisibility={this.state.showMonument}
                />

                <View style={styles.profielView}>
                    <TouchableOpacity onPress={() => navigate('Profile', { sessionId: this.state.sessionId })}>
                        <Image style={styles.avatar}
                            source={{ uri: userProfielData.picture }} />
                    </TouchableOpacity>
                </View>
                <View >

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
                </View>

                {this.renderStartButton()}
                {this.renderCheckPointPhoto()}




                <ModalExample ref='popupchild'
                    imageUri={this.state.data}
                    blur={this.state.blurpercentage}
                    data={this.state.Name}

                    startGameSession={this.startGameSession.bind(this)}
                />
                <Quiz_popUp ref='quizchild'
                    imageUri={this.state.data}
                    data={this.state.Name}
                />

            </View >
        );



    }
    //#endregion
}
//#region  Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: "rgba(51,204,0,1)",
        width: 200,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },
    bottomStartView: {
        position: 'absolute',
        bottom: '2%'
    },
    CheckpointView: {
        position: 'absolute',
        bottom: '2%',
        right: '2%'

    },
    profielView: {
        position: 'absolute',
        top: '1%',
        right: '2%',
        alignSelf: 'flex-end'
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
//#endregion

function mapStateToProps(state) {
    return {
        currentLocationState: state.currentLocation,
        monumentState: state.monument,
        getUserSessionState: state.getUserSession,
        postUserSessionState: state.postUserSession
    }
}

export default connect(mapStateToProps, {
    monument,
    location,
    getUserSession,
    postUserSession
})(Home)