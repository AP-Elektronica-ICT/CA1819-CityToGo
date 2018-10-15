import React from 'react';
import {Scene,Router} from 'react-native-router-flux';
import LoginForm from './LoginForm';
import Login from './Login';
import SignUp from './SignUp';
import App from './../../App';

const RouterComponent=()=>{
    return(
        <Router>
            <Scene key='root'>
                <Scene key="Login" component={Login} title="Please Login"initial />
                <Scene key="App" component={App} title="City2Go" />
                <Scene key="SignUp" component={SignUp} title="Registration"/>
            </Scene>
        </Router>
    )
}
export default RouterComponent;