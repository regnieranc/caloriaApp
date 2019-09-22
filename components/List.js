import React from 'react'
import {Modal, ScrollView} from 'react-native'
import {ListItem} from 'react-native-elements'

export default class List extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	visible:true
	  };
	}

	render(){
		return (
			<Modal visible={this.state.visible} animationType='slide'>
				<ScrollView>			
				{
					this.props.lista.map((ele, index) => (
						<ListItem 
							key={index}
							title={ele.label.toString()}
							bottomDivider
							onPress={() => {
								this.props.selectedItem(ele)
								this.setState({visible:false})
							}}
						/>
					))
				}
				</ScrollView> 
			</Modal>
		)
	}
}
