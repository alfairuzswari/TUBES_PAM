import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import firebase from '../firebase';

const SearchScreen = ({ route, navigation }) => {
    const [searchText, setSearchText] = useState(route.params.searchQuery || '');
    const [items, setItems] = useState([]);

    const handleItemPress = (item) => {
        navigation.navigate('Detail', { item });
    };

    const fetchItems = async () => {
        try {
            const itemsRef = firebase.firestore().collection('items');
            const snapshot = await itemsRef
                .orderBy('name')
                .startAt(searchText)
                .endAt(searchText + '\uf8ff')
                .get();

            const itemList = [];
            snapshot.forEach((doc) => {
                itemList.push({ id: doc.id, ...doc.data() });
            });
            setItems(itemList);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [searchText]);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.listItem} onPress={() => handleItemPress(item)}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search Results for "{searchText}"</Text>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADB3BC',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    listItem: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: 'blue',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    searchButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default SearchScreen;
