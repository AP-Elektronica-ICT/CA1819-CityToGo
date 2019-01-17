'use strict';

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
    render() {
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
                    <Viro360Image source={require( "../assets/portal_ship/360_island.jpg")} />
                </ViroPortalScene>
            </ViroARScene>
        );
    }
}
module.exports = PortalAR;
