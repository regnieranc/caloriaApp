import React from 'react'
import {View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native'
import { LinearGradient} from 'expo-linear-gradient'
import { Button } from 'react-native-elements'
import {Abecedario, cantidadAlimento} from './../utils/constant'
import List from './../components/List'
import Tabla from './../components/Tabla'
import {DisplayFood} from './../utils/api'
import { AsyncStorage } from 'react-native'

export default class Calorias extends React.Component{
	static navigationOptions = { header: null }//Elimina el header por defecto de la screen
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	abcSelected:false,
	  	letraSelected:'',
	  	alimentos:[],
	  	alimento:'',
	  	alimentoID:'',
	  	toggleAlimento:false,
	  	cantidad:0, 
	  	response:[]
	  };
	}


	handleLetraSelectedItem = async (ele) => {
		this.setState({letraSelected:ele.value, toggleAlimento:false, cantidad:0})
		try{
			const token = await AsyncStorage.getItem('token')
			const MyHeaders = {
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`
			}
			let body = new FormData()
			body.append('buscar', this.state.letraSelected)
			let response = await fetch(DisplayFood, {method:'post', headers:MyHeaders, body})
			let data = await response.json()
			const array = []
			await data.map(ele => {
				let obj = {
					label:ele.nombre,
					value:ele.id
				}
				array.push(obj)
			})
			this.setState({alimentos:array, abcSelected:!this.state.abcSelected})
			console.log(data)
		}catch(error){
			console.log(error)
		}
	}

	handleAlimentoSelectedItem = (ele) => {
		this.setState({alimento:ele.label, alimentoID:ele.value, toggleAlimento:true, alimentos:[]})
		console.log(ele)
	}

	handleCantidadSelectedItem = ele => {
		this.setState({cantidad:ele.value})
		console.log(ele)
	}

	getData = async => {
		try{

		}catch(error){
			console.log(error)
		}
	}
	
	componentDidMount(){

	}

	render(){
		return(
			<LinearGradient
				colors={['#ec2F4B', '#009FFF']}
				style={styles.gradient}
			>
				<View>
					<View style={{height:200}}>
						{
							!this.state.abcSelected?
							<Button
								title={this.state.letraSelected? 'Letra: '+this.state.letraSelected : 'Elija una letra'}
								onPress={async () => await this.setState({abcSelected:!this.state.abcSelected})}
								buttonStyle={{backgroundColor:'#a333c8'}}
							/>:
							<ActivityIndicator 
								size="large" 
								color='#a333c8'
							/>
						}
						{
							this.state.abcSelected?
							<List 
								lista={Abecedario}
								selectedItem={this.handleLetraSelectedItem}
							/> : null
						}
						{
							this.state.alimentos.length!=0?
							<List 
								lista={this.state.alimentos} 
								selectedItem={this.handleAlimentoSelectedItem}
							/> : null
						}
						{
							this.state.toggleAlimento?
							<>
								<Text 
									style={{fontSize:20, color:'white', textAlign:'center', marginTop:10, marginBottom:10}}
								>
									Cantidad: {this.state.cantidad}
								</Text>
								<Text 
									style={{fontSize:20, color:'white', textAlign:'center', marginTop:10, marginBottom:10}}
								>
									Alimento: {this.state.alimento}
								</Text>
								<List 
									lista={cantidadAlimento}
									selectedItem={this.handleCantidadSelectedItem}
								/>
								<Button
									title='Agregar Calorias'
									buttonStyle={{backgroundColor:'#a333c8'}}
								/>
							</> : null
						}
						<Text></Text>
					</View>
					<View style={{height:200}}>
						<Tabla 
							headers={['Fecha', 'Cantidad', 'Alimento', 'Calorias', 'Accion']}
						/>
					</View>
				</View>
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
		//alignItems: 'center',
		paddingRight:20,
		paddingLeft:20,
		paddingTop: 24
	}
})