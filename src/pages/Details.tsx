import React from "react";
import { View, Text, StatusBar } from "react-native";
import styles from "../styles/styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RoutesParams  } from "../routers/routerParams";

type Props = NativeStackScreenProps<RoutesParams , "Details">;
export default function ({ route, navigation }: Props) {
    const { content, title } = route.params;

    React.useEffect(() =>{
        navigation.setOptions({title});
    },[])

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text>{title}</Text>
        </View>
    );
}