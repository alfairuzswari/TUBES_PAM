import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Image, ScrollView, SafeAreaView } from 'react-native';
import firebase from '../firebase';


const HomeScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [userName, setUserName] = useState('');

  const handleSearchPress = () => {
    navigation.navigate('Search', { searchQuery: searchText });
  };

  const handleItemPress = (item) => {
    navigation.navigate('Detail', { item });
  };

  const fetchItems = async () => {
    try {
      const itemsRef = firebase.firestore().collection('items');
      const snapshot = await itemsRef.get();

      const itemList = [];
      snapshot.forEach((doc) => {
        itemList.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemList);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserData = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection('users').doc(user.uid);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserName(doc.data().name);
          }
        })
        .catch((error) => {
          console.error('Error mendapatkan data user:', error);
        });
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchItems();
  }, []);



  const renderItemRecom = ({ item }) => (
    <TouchableOpacity style={styles.listItemRecom} onPress={() => handleItemPress(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImageRecom} />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItemPromo = ({ item }) => (
    <TouchableOpacity style={styles.listItemPromo} onPress={() => handleItemPress(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImagePromo} />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Image 
      style={styles.gambar} 
      source={require('../assets/logo.png')} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search item"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>{'Selamat datang, '} {userName}{'! \nLagi Cari Kosan?'}</Text>
      </View>
      <Text style={styles.TextRekomPromo}>Rekomendasi</Text>
      <View style={styles.recomendationList}>
        <FlatList
          data={items}
          renderItem={renderItemRecom}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View >
      <View style={styles.promoList}>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.TextRekomPromo}>Promo</Text>
        <FlatList
          data={items}
          numColumns={3}
          renderItem={renderItemPromo}
          keyExtractor={(item) => item.id}
        />
      </View>

    </ScrollView >
  );
};

const styles = StyleSheet.create({
  gambar: {
    marginTop: 0,
    width: 75,
    height: 75,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#ADB3BC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  welcomeContainer: {
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
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
  itemImageRecom: {
    marginHorizontal: 10,
    width: '100%',
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  listItemRecom: {
    marginLeft: 10,
    marginVertical: 10,
    width: 140,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  recomendationList: {
    marginVertical: 10,
    backgroundColor: '#666666',
    borderRadius: 10,
  },
  listItemPromo: {
    marginHorizontal: 7,
    marginBottom: 5,
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemImagePromo: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  TextRekomPromo: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },

});

export default HomeScreen;
