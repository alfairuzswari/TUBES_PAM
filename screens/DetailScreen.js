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
                    style={{ position: 'relative', bottom: 300 }}
                />
            </TouchableOpacity>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.title}>{item.kostid}</Text>
            <ScrollView>
                <View style={styles.detailContainer}>
                    <Text style={styles.desc}>Fasilitas Kamar</Text>
                    <TouchableOpacity style={styles.textList}>
                        <MaterialCommunityIcons name="air-conditioner" size={24} color="black" />
                        <Text style={styles.ListText}>Air Conditioner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textList}>
                        <MaterialCommunityIcons name="bed-single" size={24} color="black" />
                        <Text style={styles.ListText}>Kasur</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textList}>
                        <MaterialCommunityIcons name="desk" size={24} color="black" />
                        <Text style={styles.ListText}>Meja belajar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textList}>
                        <MaterialCommunityIcons name="cupboard" size={24} color="black" />
                        <Text style={styles.ListText}>Lemari</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.desc}>Fasilitas Kamar Mandi</Text>
                    <TouchableOpacity style={styles.textList}>
                        <FontAwesome name="bathtub" size={24} color="black" />
                        <Text style={styles.ListText}>Bak Mandi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textList}>
                        <MaterialCommunityIcons name="toilet" size={24} color="black" />
                        <Text style={styles.ListText}>Toilet duduk</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textList}>
                        <FontAwesome name="shower" size={24} color="black" />
                        <Text style={styles.ListText}>Shower</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textList}>
                        <MaterialCommunityIcons name="hanger" size={24} color="black" />
                        <Text style={styles.ListText}>Jemuran</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.desc}>Fasilitas Umum</Text>
                    <TouchableOpacity style={styles.textList}>
                        <Fontisto name="wifi-logo" size={24} color="black" />
                        <Text style={styles.ListText}>Free Wifi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textList}>
                        <MaterialCommunityIcons name="stove" size={24} color="black" />
                        <Text style={styles.ListText}>Dapur</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textList}>
                        <MaterialCommunityIcons name="cctv" size={24} color="black" />
                        <Text style={styles.ListText}>CCTV 24 jam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textList}>
                        <MaterialIcons name="local-parking" size={24} color="black" />
                        <Text style={styles.ListText}>Area Parkir</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.desc}>Peraturan Kos</Text>
                    <TouchableOpacity style={styles.textList}>
                        <MaterialCommunityIcons name="hours-24" size={24} color="black" />
                        <Text style={styles.ListText}>Akses 24 jam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textList}>
                        <Foundation name="no-dogs" size={24} color="black" />
                        <Text style={styles.ListText}>Dilarang membawa hewan buas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textList}>
                        <Foundation name="no-smoking" size={24} color="black" />
                        <Text style={styles.ListText}>Dilarang Merokok</Text>
                    </TouchableOpacity>

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
    desc: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    detailContainer: {
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
    footer: {
        borderRadius: 10,
        backgroundColor: "#ffc0cb",
        alignItems: "center",
    },
    price: {
        fontSize: 18,
    },
    ListText: {
        marginLeft: 5,
    },
    textList: {
        flexDirection: 'row',
        width: "50%",
        height: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 5,

    },
});

export default DetailScreen;
