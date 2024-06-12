import { Platform, StyleSheet, StatusBar } from "react-native";
export default StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        backgroundColor:"ghostwhite",
        ...Platform.select({
            ios:{paddingTop:20},
            android:{paddingTop:StatusBar.currentHeight},
        }),
    },
    box: {
        width: 50,
        justifyContent: "center",
        alignSelf:"stretch",
        alignItems: "center",
        backgroundColor:"lightgray",
        borderWidth:1,
        borderStyle:"dashed",
        borderColor:"darkslategray"
    },
    boxText:{
        color:"darkslategray",
        fontWeight:"bold",
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignSelf: "stretch",
      },
    
      column: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        alignSelf: "stretch",
      },
})