import React from 'react'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import {StyleSheet, View} from 'react-native'

export default class Tabla extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render(){
		return(
			<View style={styles.container}>
        		<Table>
          			<Row data={this.props.headers} style={styles.head} textStyle={styles.text}/>
          			<Rows data={null} textStyle={styles.text}/>
        		</Table>
      		</View>
		)
	}
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: 'transparent' },
  head: { height: 40, backgroundColor: '#a333c8' },
  text: { margin: 6, color:'#fff' }
});