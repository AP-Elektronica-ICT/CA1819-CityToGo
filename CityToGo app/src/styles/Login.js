import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		backgroundColor: '#454F63'
		
		
	},
	imageBackground:{
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",

		
	},
	titleStyle:{
		alignSelf: 'center',
		color: '#FFFFFF',
		fontSize:45,
		//fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10,
		justifyContent:"center",
		textAlign: 'center',
		opacity: 1
	},
	subTitleStyle:{
		alignSelf: 'center',
		color: '#FFFFFF',
		fontSize:15,
		//fontWeight: '600',
	
		paddingBottom: 10,
		justifyContent:"center",
		textAlign: 'center'
	}
});

export default styles;