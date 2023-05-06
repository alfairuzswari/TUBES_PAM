import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from '../firebase';

const EditProfileScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = async () => {
        const user = firebase.auth().currentUser;

        if (name !== '') {
            await firebase.firestore().collection('users').doc(user.uid).update({ name });
        }

        if (password !== '') {
            if (password == confirmPassword) {
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
});

export default EditProfileScreen;
