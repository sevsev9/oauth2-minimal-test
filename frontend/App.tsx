import React, {Component} from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

GoogleSignin.configure();

class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      userGoogleInfo: {},
      loaded: false,
    };
  }

  signIn = async () => {
    try {
      console.log('asdsad');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({
        userGoogleInfo: userInfo,
        loaded: true,
      });
      console.log(this.state.userGoogleInfo);
      console.log(this.state);
      const token = await GoogleSignin.getTokens();
      console.log(token);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('e 1');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('e 2');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('e 3');
      } else {
        console.log(error.message);
      }
    }
  };

  render() {
    return (
      <View>
        <GoogleSigninButton
          style={{width: 222, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
        />
        <Button title={'test'} onPress={this.signIn} />
        {this.state.loaded ? (
          <View>
            <Text>{this.state.userGoogleInfo.user.name}</Text>
            <Text>{this.state.userGoogleInfo.user.email}</Text>
          </View>
        ) : (
          <Text>Not SignedIn</Text>
        )}
      </View>
    );
  }
}

export default App;
