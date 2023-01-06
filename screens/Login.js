import React, { Component } from "react";
import { StyleSheet, View, Image,Text, TextInput, TouchableOpacity, Alert, SafeAreaView, StatusBar } from "react-native";
import firebase from "firebase";
import * as Font from "expo-font";
import { RFValue } from "react-native-responsive-fontsize";


let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            fontsLoaded: false,
            email: '',
            password: '',
            isUserSignedIn: false,
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    
    componentDidMount() {
    this._loadFontsAsync();
    }

    signIn = async (email, password) => {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.replace("Notes");
        })
        .catch(error => {
          Alert.alert(error.message)
        })
    }

    render(){
        const {email, password} = this.state;
        return (
           <View style={styles.container}>
             <SafeAreaView style={styles.droidSafeArea}/>
             <Text style={styles.appTitleText}> Login Here!</Text>

             <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({first_name: text})}
                placeholder={"Enter Email Here"}
                placeholderTextColor={"#FFFFFF"}
              />
              <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({last_name: text})}
                placeholder={"Enter Password Here"}
                placeholderTextColor={"#FFFFFF"}
              />
             <TouchableOpacity style={styles.button}
                onPress={() => this.signIn(email, password) }
              > <Text>Click here to Login Now!</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}
                onPress={() => this.props.navigation.navigate("Register") }
              > <Text>Click here to Register Now!</Text>
              </TouchableOpacity>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appIcon: {
        width: RFValue(200),
        height: RFValue(200),
        resizeMode: "contain",
        marginBottom: RFValue(20)
    },
    appTitleText: {
        color: "#cc5c90",
        textAlign: "center",
        fontSize: RFValue(40),
        marginBottom: RFValue(20)
    },
    textinput: {
        width: RFValue(250),
        height: RFValue(40),
        padding: RFValue(10),
        marginTop: RFValue(10),
        borderColor: "#cc5c90",
        borderWidth: RFValue(4),
        borderRadius: RFValue(15),
        fontSize: RFValue(15),
        color: "#FFFFFF",
        backgroundColor: "#000000"
    },
    button: {
        width: RFValue(250),
        height: RFValue(100),
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: RFValue(30),
        backgroundColor: "#FDDA0D",
        marginBottom: RFValue(20)
    },
    buttonText: {
        fontSize: RFValue(24),
        color: "#cc5c90"
    },
    buttonTextNewUser: {
        fontSize: RFValue(12),
        color: "#FFFFFF",
        textDecorationLine: 'underline'
    }
  });