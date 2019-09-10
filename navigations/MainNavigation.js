import { createStackNavigator, createAppContainer } from 'react-navigation'
import Login from './../screens/Login'
import Navegacion from './Navegacion'

const stack = createStackNavigator({
	Login:Login,
	Main:Navegacion
},{
	initialRouteName:'Login',
	headerMode: 'none',
})

const MainNavigation = createAppContainer(stack)
export default MainNavigation