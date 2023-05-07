import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
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
            <ScrollView>
                <View style={styles.detailContainer}>
                    <Text style={styles.desc}>Fasilitas Kamar</Text>
                    <MaterialCommunityIcons name="air-conditioner" size={24} color="black" />
                    <MaterialCommunityIcons name="bed-single" size={24} color="black" />
                    <MaterialCommunityIcons name="desk" size={24} color="black" />
                    <MaterialCommunityIcons name="cupboard" size={24} color="black" />
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.desc}>Fasilitas Kamar Mandi</Text>
                    <FontAwesome name="bathtub" size={24} color="black" />
                    <MaterialCommunityIcons name="toilet" size={24} color="black" />
                    <FontAwesome name="shower" size={24} color="black" />
                    <MaterialCommunityIcons name="hanger" size={24} color="black" />
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.desc}>Fasilitas Umum</Text>
                    <Fontisto name="wifi-logo" size={24} color="black" />
                    <MaterialCommunityIcons name="stove" size={24} color="black" />
                    <MaterialCommunityIcons name="cctv" size={24} color="black" />
                    <MaterialIcons name="local-parking" size={24} color="black" />
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.desc}>Peraturan Kos</Text>
                    <MaterialCommunityIcons name="hours-24" size={24} color="black" />
                    <Foundation name="no-dogs" size={24} color="black" />
                    <Foundation name="no-smoking" size={24} color="black" />
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.price}>Rp. 6.500.000</Text>
                <Text style={styles.button}>Ajukan Sewa</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    itemImage: {
        width: '100%',
        height: 300,
        marginRight: 10,
    },
    favoriteButton: {
        alignSelf: 'flex-end',
    },
    desc:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    detailContainer:{
        alignItems: "flex-start",
    },
    button: {
        alignSelf: "center",
        backgroundColor: "#00AA13",
        padding: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        fontSize: 15,
        fontWeight: "bold",
        color: "#00203FFF",
        borderWidth: 1,
        borderColor: "#00203FFF",
      },
      footer:{
        borderRadius: 10,
        backgroundColor: "#ffc0cb",
        alignItems: "center",
      },
      price: {
        fontSize: 18,
      },
});

export default DetailScreen;
