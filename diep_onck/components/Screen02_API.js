import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const MockApiScreen = () => {
  // Mock dữ liệu danh mục và địa điểm từ API
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);

  // Giả lập dữ liệu lấy từ API
  useEffect(() => {
    // Lấy dữ liệu danh mục từ mock API
    axios.get('https://66dec2ffde4426916ee24756.mockapi.io/bycile')
      .then(response => setCategory(response.data))
      .catch(error => console.error('Error fetching category data:', error));

    // Lấy dữ liệu địa điểm phổ biến từ mock API
    axios.get('https://66dec2ffde4426916ee24756.mockapi.io/mountain')
      .then(response => setLocation(response.data))
      .catch(error => console.error('Error fetching location data:', error));
  }, []);

  // Header
  const Header = () => (
    <View style={styles.header}>
      <View style={styles.row}>
        <Image source={require('../assets/pic1.png')} style={styles.logoImage} />
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchBar} placeholder="Search here ..." />
          <Image source={require('../assets/favicon.png')} style={styles.searchIcon} />
        </View>
      </View>
      <View style={styles.row}>
        <Image source={require('../assets/splash.png')} style={styles.downloadIcon} />
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.welcomeName}>Donna Stroupe</Text>
        </View>
        <View style={styles.noteContainer}>
          <Image source={require('../assets/pic1.png')} style={styles.noteIcon} />
        </View>
      </View>
    </View>
  );

  // Footer
  const Footer = () => (
    <View style={styles.footer}>
      {['Home', 'Explore', 'Search', 'Profile'].map((item, index) => (
        <TouchableOpacity key={index} style={styles.footerItem}>
          <Image source={require('../assets/splash.png')} style={styles.footerIcon} />
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Render một mục danh mục
  const renderCategory = ({ item }) => (
    <View style={styles.categoryItem}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text>{item.name}</Text>
    </View>
  );

  // Render một địa điểm (ngang)
  const renderLocation = ({ item }) => (
    <Image source={{ uri: item.image }} style={styles.locationImage} />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Danh mục */}
      <Text style={styles.sectionTitle}>Category</Text>
      <FlatList
        data={category}
        renderItem={renderCategory}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        style={styles.categoryList}
      />

      {/* Danh sách ngang - Địa điểm phổ biến */}
      <Text style={styles.sectionTitle}>Popular Destination</Text>
      <ScrollView horizontal>
        <FlatList
          data={location}
          renderItem={renderLocation}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </ScrollView>

      {/* Danh sách ngang - Đề xuất */}
      <Text style={styles.sectionTitle}>Recommended</Text>
      <ScrollView horizontal>
        <FlatList
          data={location}
          renderItem={renderLocation}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#6053CC',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  logoImage: {
    width: 50,
    height: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    flex: 1,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 8,
    paddingLeft: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  downloadIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 16,
  },
  welcomeName: {
    color: '#fff',
    fontSize: 12,
  },
  noteContainer: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 50,
  },
  noteIcon: {
    width: 20,
    height: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
  },
  categoryList: {
    marginTop: 10,
  },
  categoryItem: {
    alignItems: 'center',
    width: '25%',
    marginVertical: 10,
  },
  categoryImage: {
    width: 50,
    height: 50,
  },
  locationImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#6053CC',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
});

export default MockApiScreen;
