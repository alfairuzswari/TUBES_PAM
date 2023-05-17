import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firebase from '../firebase';

const FavoriteScreen = ({ navigation }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Anda belum mefavoritkan apapun</Text>
    </View>
  );

  const handleItemPress = (item) => {
    navigation.navigate('Detail', { item });
  };

  const fetchFavoriteItems = async () => {
    const user = firebase.auth().currentUser;
    const favoriteItemsRef = firebase.firestore().collection('users').doc(user.uid).collection('favorites');
    const snapshot = await favoriteItemsRef.get();

    const items = [];
    snapshot.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });

    setFavoriteItems(items);
  };

  useEffect(() => {
    fetchFavoriteItems();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => handleItemPress(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ADB3BC',
  },
  listItem: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 20,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default FavoriteScreen;
