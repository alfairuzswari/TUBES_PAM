import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import firebase from '../firebase';
import * as ImagePicker from 'expo-image-picker';

const GantiGambar = ({ navigation, route }) => {
    const { item } = route.params;
    const [ImageKost, setImageKost] = useState(null);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageKost(result.assets[0].uri);
        }
    };

    const uploadImageToFirebase = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = firebase.storage().ref().child(`gambar_kosan/${item.name}`);
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
        const updates = {};

        if (ImageKost) {
            const imageUrl = await uploadImageToFirebase(ImageKost);
            updates.imageUrl = imageUrl;
        }

        if (Object.keys(updates).length > 0) {
            await firebase.firestore().collection('items').doc(item.name).update(updates);
        }

        navigation.goBack();
    };


    return (
        <View style={styles.container}>
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
    },
});

export default GantiGambar;