import React, {Component} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import {View, StyleSheet, Text, ToastAndroid, ActivityIndicator } from 'react-native'
import {Button, Input, Icon} from 'react-native-elements'
import validator from 'validator';
import {LoginApi} from './../utils/api'
import { AsyncStorage } from 'react-native'

export default class Login extends Component{
	constructor(props) {
		super(props);

		this.state = {
			email:'regnier.neira@virginiogomez.cl',
			password:'regnier320',
			logueado:false
		};
	}

	handleLogin = async () => {
		this.props.navigation.navigate('Main')
		this.setState({logueado:true})
		if(this.state.email!="" && this.state.password!=""){
			if(validator.isEmail(this.state.email)){
				try{
					let body = new FormData()
					body.append('email', this.state.email)
					body.append('password', this.state.password)
					const response = await fetch(LoginApi, {method:'post', body})
					const json = await response.json()
					await AsyncStorage.setItem('token', json.access_token)
					await AsyncStorage.setItem('name', json.user.name+' '+json.user.surname)
					/*await AsyncStorage.setItem('id', json.user.id)
					if(json.user.role){
						await AsyncStorage.setItem('role', json.user.id)
					}*/
					if(json.access_token!=''){
						this.props.navigation.navigate('Main')
					}
					
					console.log(json)
				}catch(error){
					ToastAndroid.show('error', ToastAndroid.SHORT);
				}
			}else{
				ToastAndroid.show("El email no es valido", ToastAndroid.SHORT);
			}
		}else{
			ToastAndroid.show("Debe ingresar todos sus datos", ToastAndroid.SHORT);
		}
		this.setState({logueado:false})
	}

	render(){
		return(
				<LinearGradient
					colors={['#ec2F4B', '#009FFF']}
					style={styles.gradient}
				>

					<Input 
						placeholder='Email'
						inputStyle={{color:'white'}}
						value={this.state.email}
						onChangeText={text => this.setState({email:text})}
					/>
					<Input 
						inputContainerStyle={{marginTop:10, marginBottom:20}}
						inputStyle={{color:'white'}}
						placeholder='Password'
						value={this.state.password}
						onChangeText={text => this.setState({password:text})}
						secureTextEntry={true}
					/>
					{
						!this.state.logueado? 
						<Button 
							title='Login'
							buttonStyle={{backgroundColor:'#a333c8'}}
							containerStyle={{width:'96%'}}
							onPress = {this.handleLogin}
						/> 
						: 
						<ActivityIndicator 
							size="large" 
							color='#a333c8'
						/>
					}
				</LinearGradient> 
		)
	}
}

const styles = StyleSheet.create({

	gradient:{
		flex: 1,
		position: 'relative' ,
		top: 0,
		bottom:0,
		left:0,
		right:0, 
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight:60,
		paddingLeft:60
	}
})