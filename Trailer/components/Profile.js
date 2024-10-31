import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { auth } from '../Firebase/firebaseSetup'; // Import the auth instance
import { signOut } from 'firebase/auth'; // Import the signOut function

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
              navigation.navigate('Login');
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }}
          title="Sign Out"
          color="#fff"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>UID: {user.uid}</Text>
        </>
      ) : (
        <Text style={styles.text}>No user is logged in</Text>
      )}
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
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Profile;