import React, { useEffect, useState } from "react";
import { Button, Platform, View, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./src/pages/Home";
import Details from "./src/pages/Details";
import News from "./src/pages/News";
import Settings from "./src/pages/Settings";
import UserProfile from "./src/pages/UserProfile";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
// import { getExpoPushTokenAsync } from "./src/services/getExpoPushTokenAsync";


Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldPlaySound: false,
            shouldSetBadge: false,
            shouldShowAlert: true,
        };
    }
});


// import Settings from "./src/pages/Settings";
import {RoutesParams} from "./src/routers/routerParams";
import {Routes} from "./src/routers/bottomRouter";


const Stack = createNativeStackNavigator<RoutesParams>();
const Tab = createBottomTabNavigator<RoutesParams>();
const Drawer = createDrawerNavigator<RoutesParams>();


function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="News" component={News} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

function IOSNavigator() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="News" component={News} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

function AndroidNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Tabs" component={TabNavigator}
                           options={{ drawerLabel: 'Home', headerShown: true }}
            />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="News" component={News} />
            <Drawer.Screen name="UserProfile" component={UserProfile} />
        </Drawer.Navigator>
    );
}

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="RabbitApp" component={Platform.OS === "ios" ? IOSNavigator : AndroidNavigator} />
            <Stack.Screen
                name="Details"
                component={Details}
                options={({ route }) => ({
                    headerRight: () => (
                        <Button
                            title="Buy"
                            onPress={() => {}}
                            disabled={route.params && route.params.stock === 0}
                        />
                    ),
                })}
            />
        </Stack.Navigator>
    );
}

/**
 * Asynchronously requests and obtains the Expo push notification token.
 * @returns {Promise<string|null>} The Expo push notification token or null if it cannot be obtained.
 */
async function getExpoPushTokenAsync() {
    if (!Constants.isDevice) {
        Alert.alert('Error:', "Must use physical device for Push Notifications");
        console.error('Must use physical device for Push Notifications');
        return null;
    }

    // Check for existing permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Notifications.requestPermissionsAsync({
            ios: {
                allowAlert: true,
                allowBadge: true,
                allowSound: true,
            },
        });
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        Alert.alert('Error:', "Failed to get push token for push notification!");
        console.error('Failed to get push token for push notification!');
        return null;
    }

    // Get the token that uniquely identifies this device
    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = JSON.stringify(tokenData);
    console.log('Push token:', tokenData.data); // Log the token for testing purposes
    Alert.alert('ExponentPushToken:', token);
    return tokenData.data;
}

export default function App(){
    const [expoPushToken, setExpoPushToken] = useState('');
    useEffect(() => {
        Alert.alert('init message:', 'waiting for ExponentPushToken');
        getExpoPushTokenAsync().then(token => {
            if (token) {
                
                setExpoPushToken(token);
                // Optionally, send the token to your server here
                Alert.alert('ExponentPushToken:', token);
            }
        }).catch(error => {
            Alert.alert('Error:', "Error getting Expo push token");
            console.error('Error getting Expo push token:', error);
        });
    }, []);

    useEffect(() => {
        async function configurePushNotifications(){
            const { status } = await Notifications.getPermissionsAsync();
            let finalStatus = status;
            if (finalStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted'){
                Alert.alert('Permission required', 'Push notifications need the appropriate permission.');
                return;
            }
            const pushTokenData = await Notifications.getExpoPushTokenAsync();
            console.log(pushTokenData);
            Alert.alert('ExponentPushToken:', JSON.stringify(pushTokenData));
            if (Platform.OS === 'android'){
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.DEFAULT
                });
            }
        }
        configurePushNotifications();

    },[]);


    useEffect(() =>{
        const subscription = Notifications.addNotificationReceivedListener((notification) =>{
            console.log('NOTIFICATION RECEIVED');
            console.log(notification);
            const userName = notification.request.content.data.userName;
            console.log(userName);
        });

        const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log('NOTIFICATION RESPONSE RECEIVED');
            console.log(response);
            const userName = response.notification.request.content.data.userName;
            console.log(userName);
        });
        return () => {
            subscription.remove();
            subscription2.remove();
        };
    }, []);
    useEffect(() => {
        async function scheduleNotification() {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'My first local notification',
                    body: 'This is the body of the notification.',
                    data: { userName: 'Dave' }
                },
                trigger: {
                    seconds: 5
                }
            });
        }

        scheduleNotification();
    }, []);

    function sendPushNotificationHandler() {
        fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    to: 'ExponentPushToken[NiY46_AgjZ4cDMyPWsua_T]',
                    title: 'Test - sent from a device!',
                    body: 'This is a test!'
                }
            )
        });
    }

    return (

            // <Button title='Schedule Notification' onPress={scheduleNotificationHandler} />
            <NavigationContainer>
                <StackNavigator />
            </NavigationContainer>

    );
}