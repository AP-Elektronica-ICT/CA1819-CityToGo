import React from 'react';
import {Scene,Router} from 'react-native-router-flux';
import StartPage from './StartPage';
import Login from './Login';
import SignUp from './SignUp';
import App from './../../App';

const RouterComponent=()=>{
    return(
        <Router navigationBarStyle={{backgroundColor:'transparnet'}}>
            <Scene key='root'>
                <Scene key="StartPage" component={StartPage} hideNavBar={true}  initial/>   
                <Scene key="Login" component={Login} hideNavBar={true}  />
                <Scene key="App" component={App} hideNavBar={true} />
                <Scene key="SignUp" component={SignUp} hideNavBar={true} />
            </Scene>
        </Router>
    )
}
export default RouterComponent;