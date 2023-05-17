import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import firebase from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const goToRegisterPage = () => {
        navigation.navigate('Register');
    };

    const handleLogin = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                // Signed in
                navigation.navigate('Home');
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Error', 'Email tidak valid', [
                        { text: 'OK'},
                    ]);
                } else if (error.code === 'auth/user-disabled') {
                    Alert.alert('Error', 'Akun pengguna dinonaktifkan', [
                        { text: 'OK'},
                    ]);
                } else if (error.code === 'auth/user-not-found') {
                    Alert.alert('Error', 'Pengguna tidak ditemukan', [
                        { text: 'OK'},
                    ]);
                } else if (error.code === 'auth/wrong-password') {
                    Alert.alert('Error', 'Password salah', [
                        { text: 'OK'},
                    ]);
                }
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Login</Text>
                <Image
                    style={styles.gambarlogo}
                    source={require('../assets/logo.png')} />
            </View>
            <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={24} color="gray" />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email         "
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={24} color="gray" />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.icon} onPress={() => setShowPassword(!showPassword)}>
                    <MaterialIcons
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.registerText1}>Belum Punya Akun? {' '}
                <TouchableOpacity onPress={goToRegisterPage}>
                    <Text style={styles.registerText2}>Sign Up</Text>
                </TouchableOpacity>
            </Text>

        </View >
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
        backgroundColor: '#ADB3BC',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        position: 'relative',
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: -150,
        lineHeight: 65,
        
    },
    button: {
        backgroundColor: '#58D774',
        width: 156,
        height: 49,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 10,
    },
    inputContainer: {
        height: 59,
        width: 400,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'grey',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
        marginBottom: 15,
    },
    input: {
        width: 320,
        marginLeft: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 13,
    },
    registerText1: {
        color: 'black',
    },
    registerText2: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    icon: {
        position: 'absolute',
        right: 15
    },
});

export default LoginPage;