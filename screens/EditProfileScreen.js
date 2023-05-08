import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Button, Image } from 'react-native';
import firebase from '../firebase';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImageToFirebase = async (uri) => {
        const user = firebase.auth().currentUser;
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = firebase.storage().ref().child(`profile_pictures/${user.uid}`);
        const uploadTask = storageRef.put(blob);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    // Progress updates are optional
                },
                (error) => {
                    // Handle unsuccessful uploads
                    reject(error);
                },
                async () => {
                    // Handle successful uploads on complete
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    resolve(downloadURL);
                }
            );
        });
    };


    const handleSave = async () => {
        const user = firebase.auth().currentUser;
        const updates = {};

        if (name !== '') {
            updates.name = name;
        }

        if (image) {
            const imageUrl = await uploadImageToFirebase(image);
            updates.profilePicture = imageUrl;
        }

        if (Object.keys(updates).length > 0) {
            await firebase.firestore().collection('users').doc(user.uid).update(updates);
        }

        if (password !== '') {
            if (password === confirmPassword) {
                await user.updatePassword(password);
            } else {
                Alert.alert('Error', 'Password and confirm password Tidak Sama');
                return;
            }
        }

        navigation.goBack();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nama:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Masukan Nama Baru"
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                placeholder="Masukan Password Baru"
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry
                placeholder="Masukan Ulang Password Baru"
            />

            <TouchableOpacity style={styles.uploadImageButton} onPress={pickImage}>
                <Text style={styles.uploadImageButtonText}>Pick an image from camera roll</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#4a90e2',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    uploadImageButton: {
        backgroundColor: 'black',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 50,
    },
    uploadImageButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default EditProfileScreen;
