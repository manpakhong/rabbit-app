import React from "react";
import { View, Text, Button, StatusBar } from "react-native";
import styles from "../styles/styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RoutesParams } from "../routers/routerParams";

type Props = NativeStackScreenProps<RoutesParams>;

export default function UserProfile({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text>User Profile</Text>
            <Button title="Settings" onPress={() => navigation.navigate("Settings")} />
        </View>
    );
}