import React from 'react'
import {View, Text} from 'react-native'

export default class Imc extends React.Component{
	static navigationOptions = { header: null }//Elimina el header por defecto de la screen
	
	render(){
		return(
			<View>
				<Text>Imc</Text>
			</View>	
		)
	}
}