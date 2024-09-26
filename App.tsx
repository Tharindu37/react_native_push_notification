import React, {useEffect} from 'react';
import {Text, View, Button, Alert} from 'react-native';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';

function App(): React.JSX.Element {
  async function requestUserPermission() {
    const authStatus = await notifee.requestPermission();
    if (authStatus.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      console.log('Permission status:', authStatus);
    } else {
      console.log('User declined permissions');
    }
  }

  useEffect(() => {
    requestUserPermission();
  }, []);

  async function displayNotification() {
    // Create a notification channel
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display the notification
    await notifee.displayNotification({
      title: 'Hello, World!',
      body: 'This is a local notification.',
      android: {
        channelId: 'default',
      },
    });
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hi, how are you?</Text>
      <Button
        title="Show Notification"
        onPress={() => {
          displayNotification();
          Alert.alert('Notification', 'Notification will be shown!');
        }}
      />
    </View>
  );
}

export default App;
