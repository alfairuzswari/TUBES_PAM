import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firebase from '../firebase';
import { Octicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [userName, setUser] = useState('');
  const [userImage, setImage] = useState('');

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const fetchUserData = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection('users').doc(user.uid);
      const storageRef = firebase.storage().ref();
      const profilePictureRef = storageRef.child(`profile_pictures/${user.uid}`);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUser(doc.data().name);
          }
        })
        .catch((error) => {
          console.error('Error mendapatkan data:', error);
        });

      try {
        const url = await profilePictureRef.getDownloadURL();
        setImage(url);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    }
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        {userImage && (
          <Image
            source={{ uri: userImage }}
            style={styles.profileImage}
          />
        )}
        <Text style={styles.profileName}>{userName}</Text>
        <TouchableOpacity onPress={() => handleEditProfile()}>
          <Text style={styles.editProfile}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.textList}>
        <Octicons name="gear" size={24} color="gray" style={styles.icon} />
        <Text style={styles.ListText}>Pengaturan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textList}>
        <FontAwesome5 name="user-check" size={24} color="gray" style={styles.icon} />
        <Text style={styles.ListText}>Verifikasi Akun</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textList}>
        <MaterialIcons name="event-note" size={24} color="gray" style={styles.icon} />
        <Text style={styles.ListText}>Syarat Dan Ketentuan</Text>
      </TouchableOpacity>
      <View style={styles.spacer} />
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: '#ADB3BC',
  },
  spacer: {
    flex: 1,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  textList: {
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#D1D5DB',
    width: "90%",
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  ListText: {
    marginLeft: 5,
  },
  profile: {
    marginBottom: 50,
    marginTop: 30,
    width: "90%",
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#D1D5DB',
  },
  profileImage: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 10,
  },
  profileName: {
    fontWeight: '500',
    position: 'relative',
    bottom: 65,
    left: 80,
    marginLeft: 10,
  },
  editProfile: {
    color: 'red',
    position: 'relative',
    bottom: 40,
    left: 90,
  },
});

export default ProfileScreen;