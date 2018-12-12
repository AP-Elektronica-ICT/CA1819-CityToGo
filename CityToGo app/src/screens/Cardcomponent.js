import React, { Component } from 'react';

import MapView from 'react-native-maps';
import { Card, Image, View, Subtitle, Text, Caption } from '@shoutem/ui';


class Cardo extends Component {
    state={
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        Uri:this.props.Uri,
        Name: this.props.Name,
        //visibilty: false


    }

    render() {

if(this.props.visibilty){
        return (
            <MapView.Marker coordinate={{latitude: this.state.latitude,
                                         longitude: this.state.longitude}}>

                <MapView.Callout>
                    <Card>
                        <Image styleName="medium-wide"
                               source={{uri: this.state.Uri}} />
                        <View styleName="content">
                            <Subtitle>{this.state.Name}</Subtitle>
                           
                        </View>
                    </Card>
                </MapView.Callout>
            </MapView.Marker>
        )}
        else{

            return(null)
        }
        
    }
}

export default Cardo;