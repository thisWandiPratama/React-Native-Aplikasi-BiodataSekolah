import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';

export default class App extends Component<{}>
{
    constructor()
    {
        super();

        this.state = { first_name: '', last_name: '', email:'', password:'' ,loading: false, disabled: false }
    }

    saveData = () =>
    {
        this.setState({ loading: true, disabled: true }, () =>
        {
            fetch('http://192.168.1.28/biodata/user_registration.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                    first_name: this.state.first_name,

                    last_name: this.state.last_name,
		    
		    email: this.state.email,
		    
		    password: this.state.password
                })

            }).then((response) => response.json()).then((responseJson) =>
            {
                alert(responseJson);
                this.setState({ loading: false, disabled: false });
            }).catch((error) =>
            {
                console.error(error);
                this.setState({ loading: false, disabled: false });
            });
        });
    }

    render()
    {
        return(
	<View style={styles.header}>
		<Text style={styles.headText}>Halaman Register User</Text>
            <View style = { styles.container }>
                <TextInput underlineColorAndroid = "transparent" placeholder = "Masukkan Nama Depan Anda" style = { styles.textInput } onChangeText = {(text) => this.setState({ first_name: text })}/>

	        <TextInput underlineColorAndroid = "transparent" placeholder = "Masukkan Nama Belakang Anda" style = { styles.textInput } onChangeText = {(text) => this.setState({ last_name: text })}/>
                
		<TextInput underlineColorAndroid = "transparent" placeholder = "Masukkan Email Anda" style = { styles.textInput } onChangeText = {(text) => this.setState({ email: text })}/>
		                
		<TextInput underlineColorAndroid = "transparent" placeholder = "Masukkan Password Anda" style = { styles.textInput } onChangeText = {(text) => this.setState({ password: text })} secureTextEntry={true}/>

                <TouchableOpacity disabled = { this.state.disabled } activeOpacity = { 0.8 } style = { styles.Btn } onPress = { this.saveData }>
                    <Text style = { styles.btnText }>Insert</Text>
                </TouchableOpacity>

                {
                    (this.state.loading)
                    ?
                        (<ActivityIndicator size = "large" />)
                    :
                        null
                }
                
            </View>
	</View>
        );
    }
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FFFF',
        paddingHorizontal: 25,
        paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },

    textInput:
    {
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        marginVertical: 5,
        alignSelf: 'stretch',
        padding: 8,
        fontSize: 16
    },

    Btn:
    {
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignSelf: 'stretch',
        padding: 10,
        marginTop: 10,
        marginBottom: 25,
	borderRadius:50
    },

    btnText:
    {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },

    header:{
	flex:1,
	height :'30%',
	backgroundColor:'#000080',
	justifyContent:'center'
   },

   headText:{
	fontSize:30,
	color:'white',
	fontWeight:'bold'
  }
});
