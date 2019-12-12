import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {Button} from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';
import {LogoutApi, UltimasCalorias, MeApi} from './../utils/api'
import { AsyncStorage } from 'react-native'
import Tabla from './../components/Tabla'



export default class Perfil extends React.Component{
	static navigationOptions = { header: null }//Elimina el header por defecto de la screen

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	ID:null,
	  	ultimascalorias:null, 
	  	peso:null,
	  	historial:null
	  };
	}

	componentDidMount(){
		this.getInfo()
	}


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

	getInfo = async () => {
		try{
			const token = await AsyncStorage.getItem('token')
			const MyHeaders = {
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`
			}
			let res = await fetch(MeApi, {method:'post', headers:MyHeaders})
			let d = await res.json()
			let id = await d.id
			await this.setState({ID:id})
			const body = new FormData()
			let fecha = new Date()
			fecha=`${fecha.getFullYear()}-${1+fecha.getMonth()}-${fecha.getDate()}`
			body.append('hoy', fecha)
			body.append('id', this.state.ID)
			let response = await fetch(UltimasCalorias, {method:'post', headers:MyHeaders, body})
			let json = await response.json()
			let aux = []
			json.ultimascalorias.map(ele => {
				let aux2 = []
				aux2.push(ele.fecha, ele.calorias)
				aux.push(aux2)
			})
			await this.setState({ultimascalorias:aux, peso:json.peso, historial:json.historial})
			console.log(this.state)
		}catch(error){
			console.log(error)
		}
	}

	render(){
		return( 
			<LinearGradient 
				colors={['#ec2F4B', '#009FFF']}
				style={styles.gradient}
			>
				<ScrollView>
					<Text>{this.state.ultimascalorias}</Text>
					<Button 
						onPress={this.handleLogout}
						title='Salir'
					/>
					<ScrollView style={{height:200}}>
						<Tabla 
							headers={['Fecha', 'Calorias']}
							data={this.state.ultimascalorias?this.state.ultimascalorias:null}
						/>
					</ScrollView>
				</ScrollView>
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
		paddingRight:20,
		paddingLeft:20
	}
})