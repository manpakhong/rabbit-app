import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import appStyles from "./src/styles/appStylesVertical";
import styled from "styled-components/native";
import Box from "./src/components/Box";
import Column from "./src/components/Column";
import Row from "./src/components/Row";

// const Box2 = styled.View`
//   width: 300px;
//   height: 100px;
//   justify-content:center;
//   align-items: center;
//   background-color: lightgray;
// `;
// const BoxText2 = styled.Text`
//   color: darkslategray;
//   font-weight: bold;
// `;

const boxes = new Array(10).fill(null).map((v,i) => i + 1);

export default function App() {
  return (

    <View style={appStyles.container}>
      <StatusBar hidden={false} />
      {/* {boxes.map((i) =>(
        <Box key={i}>#{i}</Box>
      )
      )} */}
      <Row>
        <Column>
          <Box>#1</Box>
          <Box>#2</Box>
        </Column>
        <Column>
          <Box>#3</Box>
          <Box>#4</Box>
        </Column>
      </Row>
      <Row>
        <Column>
          <Box>#5</Box>
          <Box>#6</Box>
        </Column>
        <Column>
          <Box>#7</Box>
          <Box>#8</Box>
        </Column>
      </Row>
      <Row>
        <Column>
          <Box>#9</Box>
          <Box>#10</Box>
        </Column>
        <Column>
          <Box>#11</Box>
          <Box>#12</Box>
        </Column>
      </Row>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontWeight:"bold"
//   }
// });
