import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { auth } from '../Firebase/firebaseSetup'; // Import the auth instance
import { signOut } from 'firebase/auth'; // Import the signOut function
import LocationManager from './LocationManager'; // Import LocationManager

const Profile = ({ navigation }) => {
  const user = auth.currentUser;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={async () => {
            try {
              await signOut(auth);
              Alert.alert('Success', 'Signed out successfully');
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }}
          title="Sign Out"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>UID: {user.uid}</Text>
        </>
      ) : (
        <Text style={styles.text}>No user is logged in</Text>
      )}
      <LocationManager /> {/* Render LocationManager component */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Profile;