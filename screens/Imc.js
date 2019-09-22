import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default class Imc extends React.Component{
	static navigationOptions = { header: null }//Elimina el header por defecto de la screen
	
	render(){
		return(
			<LinearGradient
				colors={['#ec2F4B', '#009FFF']}
				style={styles.gradient}
			>
				<Text>Imc</Text>
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