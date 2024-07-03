import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

/**
 * Asynchronously requests and obtains the Expo push notification token.
 * @returns {Promise<string|null>} The Expo push notification token or null if it cannot be obtained.
 */
async function getExpoPushTokenAsync() {
    if (!Constants.isDevice) {
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
        console.error('Failed to get push token for push notification!');
        return null;
    }

    // Get the token that uniquely identifies this device
    const tokenData = await Notifications.getExpoPushTokenAsync();
    console.log('Push token:', tokenData.data); // Log the token for testing purposes

    return tokenData.data;
}