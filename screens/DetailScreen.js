import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import Modal from "react-native-modal";
import firebase from '../firebase';
import WaImage from '../assets/WhatsApp.svg.webp';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

const DetailScreen = ({ route }) => {
    const { item } = route.params;
    const [isFavorite, setIsFavorite] = useState(false);
    const [modal, setModal] = useState(false);

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
            <ScrollView>
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

                <View style={styles.detailContainer}>
                    <Text style={styles.desc}>Fasilitas Kamar</Text>
                    <View style={styles.textList}>
                        <MaterialCommunityIcons name="air-conditioner" size={24} color="black" />
                        <Text style={styles.ListText}>Air Conditioner</Text>
                    </View>
                    <View style={styles.textList}>
                        <MaterialCommunityIcons name="bed-single" size={24} color="black" />
                        <Text style={styles.ListText}>Kasur</Text>
                    </View>
                    <View style={styles.textList}>
                        <MaterialCommunityIcons name="desk" size={24} color="black" />
                        <Text style={styles.ListText}>Meja belajar</Text>
                    </View>
                    <View style={styles.textList}>
                        <MaterialCommunityIcons name="cupboard" size={24} color="black" />
                        <Text style={styles.ListText}>Lemari</Text>
                    </View>
                </View>

                <View style={styles.detailContainer}>
                    <Text style={styles.desc}>Fasilitas Kamar Mandi</Text>
                    <View style={styles.textList}>
                        <FontAwesome name="bathtub" size={24} color="black" />
                        <Text style={styles.ListText}>Bak Mandi</Text>
                    </View>
                    <View style={styles.textList}>
                        <MaterialCommunityIcons name="toilet" size={24} color="black" />
                        <Text style={styles.ListText}>Toilet duduk</Text>
                    </View>
                    <View style={styles.textList}>
                        <FontAwesome name="shower" size={24} color="black" />
                        <Text style={styles.ListText}>Shower</Text>
                    </View>
                    <View style={styles.textList}>
                        <MaterialCommunityIcons name="hanger" size={24} color="black" />
                        <Text style={styles.ListText}>Jemuran</Text>
                    </View>
                </View>

                <View style={styles.detailContainer}>
                    <Text style={styles.desc}>Fasilitas Umum</Text>
                    <View style={styles.textList}>
                        <Fontisto name="wifi-logo" size={24} color="black" />
                        <Text style={styles.ListText}>Free Wifi</Text>
                    </View>
                    <View style={styles.textList}>
                        <MaterialCommunityIcons name="stove" size={24} color="black" />
                        <Text style={styles.ListText}>Dapur</Text>
                    </View>
                    <View style={styles.textList}>
                        <MaterialCommunityIcons name="cctv" size={24} color="black" />
                        <Text style={styles.ListText}>CCTV 24 jam</Text>
                    </View>
                    <View style={styles.textList}>
                        <MaterialIcons name="local-parking" size={24} color="black" />
                        <Text style={styles.ListText}>Area Parkir</Text>
                    </View>
                </View>

                <View style={styles.detailContainer}>
                    <Text style={styles.desc}>Peraturan Kos</Text>
                    <View style={styles.textList}>
                        <MaterialCommunityIcons name="hours-24" size={24} color="black" />
                        <Text style={styles.ListText}>Akses 24 jam</Text>
                    </View>
                    <View style={styles.textList}>
                        <Foundation name="no-dogs" size={24} color="black" />
                        <Text style={styles.ListText}>Dilarang membawa hewan buas</Text>
                    </View>
                    <View style={styles.textList}>
                        <Foundation name="no-smoking" size={24} color="black" />
                        <Text style={styles.ListText}>Dilarang Merokok</Text>
                    </View>

                </View>

                <Text style={styles.TextRekomPromo}>Map</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: item.latitude,
                        longitude: item.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}>
                    <Marker
                        pinColor={'Blue'}
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude,
                        }}
                        title="Lokasi Kost"
                        description="Ini adalah lokasi Kost"
                    />
                </MapView>
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.price}>Rp.{item.harga} / Tahun</Text>
                <TouchableOpacity onPress={() => setModal(true)}>
                    <Text style={styles.button}>Ajukan Sewa</Text>
                </TouchableOpacity>
                <Modal isVisible={modal}>
                    <View style={styles.popUpModal}>
                        <TouchableOpacity onPress={() => setModal(false)} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold", color: 'gray' }}>x</Text>
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>Pesan Melalui Contact Dibawah ini</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Image style={styles.ImageModal} source={WaImage} />
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'gray', marginTop: 12, }}>{item.noTelp}</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ADB3BC",
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingLeft: 10,
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
        borderRadius: 30,
        backgroundColor: "#d3d3d3",
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 15,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    button: {
        alignSelf: "center",
        backgroundColor: "#44E55E",
        padding: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        fontSize: 15,
        fontWeight: "bold",
        color: "#00203FFF",
        borderWidth: 1,
        borderColor: "#00203FFF",
        marginLeft: 50,
    },
    footer: {
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: "#D1D5DB",
        alignItems: "center",
        paddingLeft: 10,
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
    popUpModal: {
        height: 150,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    ImageModal: {
        height: 60,
        width: 50,
        marginRight: 5,
    },
    map: {
        width: '100%',
        height: 300,
        marginBottom: 10,
    },
});

export default DetailScreen;