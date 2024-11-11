import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

const Screen02 = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [typeBike, setTypeBike] = useState([
    { id: 1, name: 'All', isSelected: true },
    { id: 2, name: 'RoadBike', isSelected: false },
    { id: 3, name: 'Mountain', isSelected: false },
  ]);

  const [data, setData] = useState([
    { id: 1, name: 'Pinarello', price: '$1800', image: require('../assets/pic1.png') },
    { id: 2, name: 'Pina Mountain', price: '$1700', image: require('../assets/pic1.png') },
    { id: 3, name: 'RoadBike', price: '$1500', image: require('../assets/pic1.png') },
    { id: 4, name: 'Mountain Bike', price: '$1900', image: require('../assets/pic1.png') },
    { id: 5, name: 'Pinarello', price: '$2700', image: require('../assets/pic1.png') },
    { id: 6, name: 'Pinarello', price: '$1350', image: require('../assets/pic1.png') },
  ]);

  const [selectedType, setSelectedType] = useState('All');

  const filteredData = data.filter((item) => {
    if (selectedType === 'All') {
      return true;
    }
    return item.name.toLowerCase().includes(selectedType.toLowerCase());
  });

  return (
    <View style={{ height: screenHeight, width: screenWidth, backgroundColor: '#fff' }}>
      {/* Title */}
      <Text style={styles.title}>The world’s Best Bike</Text>

      {/* Type selection buttons */}
      <View style={styles.buttonContainer}>
        {typeBike.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              setSelectedType(item.name);
              setTypeBike(typeBike.map((b) => ({ ...b, isSelected: b.id === item.id })));
            }}
            style={[styles.button, item.isSelected && styles.selectedButton]}>
            <Text style={[styles.buttonText, item.isSelected && styles.selectedButtonText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bike list */}
      <ScrollView style={{ marginBottom: 30 }}>
        {filteredData.reduce((rows, item, index) => {
          if (index % 2 === 0) {
            rows.push([item]); // New row
          } else {
            rows[rows.length - 1].push(item); // Add to existing row
          }
          return rows;
        }, []).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item, itemIndex) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => navigate('Screen03', { item })}
                style={styles.bikeItem}>
                <Image source={item.image} style={styles.bikeImage} resizeMode="contain" />
                <Text style={styles.bikeName}>{item.name}</Text>
                <Text style={styles.bikePrice}>{item.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Ubuntu',
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 29,
    textAlign: 'center',
    color: '#E94141',
    marginTop: 47,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  button: {
    width: 99,
    height: 32,
    borderWidth: 1,
    borderColor: '#E9414187',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#FCE4E1',
  },
  buttonText: {
    fontFamily: 'Voltaire',
    fontSize: 20,
    color: '#BEB6B6',
  },
  selectedButtonText: {
    color: '#E94141',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-around',
  },
  bikeItem: {
    width: 150,
    backgroundColor: '#F7BA8326',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  bikeImage: {
    width: 120,
    height: 150,
  },
  bikeName: {
    fontSize: 16,
    color: '#000',
  },
  bikePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Screen02;
