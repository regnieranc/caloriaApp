import React from 'react'
import {createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import {Icon} from 'react-native-elements'


 //screens

import HomeScreen from './../screens/Home'
import CaloriasScreen from './../screens/Calorias'
import ImcScreen from './../screens/Imc'
import PerfilScreen from './../screens/Perfil'

const homeScreenStack = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: ({navigation}) => ({
			title: 'Home'//titulo de la pantalla arriba
		})
	}
})

const caloriasScreenStack = createStackNavigator({
	Calorias: {
		screen: CaloriasScreen,
		navigationOptions: ({navigation}) => ({
			title: 'Calorias'//titulo de la pantalla arriba
		})
	}
})

const imcScreenStack = createStackNavigator({
	Imc: {
		screen: ImcScreen,
		navigationOptions: ({navigation}) => ({
			title: 'Imc'//titulo de la pantalla arriba
		})
	}
})

const perfilScreenStack = createStackNavigator({
	Perfil: {
		screen: PerfilScreen,
		navigationOptions: ({navigation}) => ({
			title: 'Perfil'//titulo de la pantalla arriba
		})
	}
}) 

const RootStack = createBottomTabNavigator({
	Home: {
		screen: homeScreenStack,
		navigationOptions: ({navigation}) => ({
			tabBarLabel: 'Home',//titulo del boton abajo
			tabBarIcon:({tintColor}) => <Icon type='font-awesome' name='home' size={28} color={tintColor}/>  
		})
	},
	Calorias: {
		screen: caloriasScreenStack,
		navigationOptions: ({navigation}) => ({
			tabBarLabel: 'Calorias',//titulo del boton abajo
			tabBarIcon:({tintColor}) => <Icon type='font-awesome' name='heart' size={28} color={tintColor}/>  
		})
	},
	Imc:{
		screen: imcScreenStack,
		navigationOptions: ({navigation}) => ({
			tabBarLabel: 'Imc',//titulo del boton abajo
			tabBarIcon:({tintColor}) => <Icon type='material-community' name='weight' size={32} color={tintColor}/>  
		})
	},
	Perfil:{//nombre que aparece bajo los iconos en la navegacion
		screen: perfilScreenStack, 
		navigationOptions: ({navigation}) => ({
			topBarLabel: 'Perfil',
			tabBarIcon:({tintColor}) => <Icon type='font-awesome' name='user' size={28} color={tintColor}/>  
		})
	}
},
{
	initialRouteName: 'Calorias',
	tabBarOptions: {
		inactiveTintColor: '#646464',
		activeTintColor: '#a333c8',
		labelStyle: {
		    marginTop: 6,
		},
		style:{
			backgroundColor: '#d0d0d0',
			height:56,
			paddingTop:6,
			paddingBottom:6
		}
	}
}
)

export default createAppContainer(RootStack)
