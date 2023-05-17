import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import firebase from '../firebase';

const RegisterPage = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const goToLoginPage = () => {
        navigation.navigate('Login');
    };

    const handleRegister = async () => {
        try {
            if (password !== confirmPassword) {
                Alert.alert('Error', 'Password and confirm password Tidak Sama');
                return;
            }
            if (name == '') {
                Alert.alert('Error', 'Nama kosong');
                return;
            }
            const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);

            // Store user's name in Firestore
            await firebase.firestore().collection('users').doc(user.uid).set({ name });

            navigation.navigate('Login');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error', 'Email ini sudah terdaftar', [
                    { text: 'OK' },
                ]);
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Error', 'Email tidak valid', [
                    { text: 'OK' },
                ]);
            } else if (error.code === 'auth/operation-not-allowed') {
                Alert.alert('Error', 'Pendaftaran email/password tidak diizinkan', [
                    { text: 'OK' },
                ]);
            } else if (error.code === 'auth/weak-password') {
                Alert.alert('Error', 'Kata sandi terlalu lemah', [
                    { text: 'OK' },
                ]);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Register</Text>
                <Image
                    style={styles.gambarlogo}
                    source={require('../assets/logo.png')} />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={setName}
                value={name}
            />
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.loginText1}>Sudah Punya Akun? {' '}
                <TouchableOpacity onPress={goToLoginPage}>
                    <Text style={styles.loginText2}>Sign In</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    gambarlogo: {
        width: 75,
        height: 75,
      },
    header: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: "#ADB3BC",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 75,
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    loginText1: {
        color: 'black',
    },
    loginText2: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default RegisterPage;
