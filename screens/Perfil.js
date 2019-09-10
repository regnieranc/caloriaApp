import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';
import {LogoutApi} from './../utils/api'
import { AsyncStorage } from 'react-native'

export default class Perfil extends React.Component{
	static navigationOptions = { header: null }//Elimina el header por defecto de la screen

	handleLogout = async () => {
		try{
			const token = await AsyncStorage.getItem('token')
			const MyHeaders = {
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`
			}
			let response = await fetch(LogoutApi, {method:'post', headers:MyHeaders})
			let json = await response.json()
			//aqwui se destruye el local storage
			await AsyncStorage.removeItem('token')
			await AsyncStorage.removeItem('name')
			await AsyncStorage.removeItem('id')
			await AsyncStorage.removeItem('role')
			//aqui redireccionar al login no se como 
			this.props.navigation.navigate("Login");
		}catch(error){
			console.log(error)
		}
		console.log('logout')
	}

	render(){
		return(
			<LinearGradient 
				colors={['#ec2F4B', '#009FFF']}
				style={styles.gradient}
			>
				<Text>Perfil</Text>
				<Button 
					onPress={this.handleLogout}
					title='Salir'
				/>
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