import React, { Component } from "react";

import {
    ViroSceneNavigator,
    ViroScene,
    ViroARScene,
    ViroAmbientLight,
    Viro360Video,
    Viro360Image,
    ViroUtils,
    ViroPortal,
    ViroPortalScene,
    Viro3DObject,
} from 'react-viro';

// var arFiles = {
//     'portal_ship_vrx': require('/portal_ship/portal_ship.vrx'),
// }

export default class PortalAR extends Component {


    generateRandomint(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }

    render() {
        //  let img360 = [
        const image1 = require("./res/360Images/eiffel.jpg")
        const image2 = require("./res/360Images/giza.jpg")
        const image3 = require("./res/360Images/liberty.jpg")
        const image4 = require("./res/360Images/moscow.jpg")
        const image5 = require("./res/360Images/picchu.jpg")
        let img360 = [image1, image2, image3, image4, image5]
        let random = this.generateRandomint(0, img360.length)
        let image = img360[random]
        console.log(random)
        console.log(image)

        return (
            <ViroARScene>
                <ViroAmbientLight color="#ffffff" intensity={200} />
                <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={() => { }}>
                    <ViroPortal position={[0, 0, -1]} scale={[.1, .1, .1]}>
                        <Viro3DObject source={require('../assets/portal_ship/portal_ship.vrx')}
                            resources={[require('../assets/portal_ship/portal_ship_diffuse.png'),
                            require('../assets/portal_ship/portal_ship_normal.png'),
                            require('../assets/portal_ship/portal_ship_specular.png')]}
                            type="VRX" />
                    </ViroPortal>
                    <Viro360Image source={image} />
                </ViroPortalScene>
            </ViroARScene>
        );
    }
}
module.exports = PortalAR;
