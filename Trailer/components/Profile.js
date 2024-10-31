// components/Profile.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../Firebase/firebaseSetup'; // Import the auth instance

const Profile = () => {
  const user = auth.currentUser;

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