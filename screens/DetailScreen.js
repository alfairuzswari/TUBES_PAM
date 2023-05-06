import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '../firebase';

const DetailScreen = ({ route }) => {
    const { item } = route.params;
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoritePress = async () => {
        const user = firebase.auth().currentUser;
        const favoriteRef = firebase.firestore().collection('users').doc(user.uid).collection('favorites').doc(item.id);

        if (isFavorite) {
            await favoriteRef.delete();
            setIsFavorite(false);
        } else {
            await favoriteRef.set(item);
            setIsFavorite(true);
        }
    };

    const checkIfFavorite = async () => {
        const user = firebase.auth().currentUser;
        const favoriteRef = firebase.firestore().collection('users').doc(user.uid).collection('favorites').doc(item.id);
        const doc = await favoriteRef.get();

        if (doc.exists) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    };

    useEffect(() => {
        checkIfFavorite();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
                <MaterialIcons
                    name={isFavorite ? 'favorite' : 'favorite-border'}
                    size={50}
                    color="red"
                    style={{position: 'relative', bottom: 300}}
                />
            </TouchableOpacity>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.title}>{item.kostid}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemImage: {
        width: '100%',
        height: 300,
        marginRight: 10,
    },
    favoriteButton: {
        alignSelf: 'flex-end',
    },
});

export default DetailScreen;
