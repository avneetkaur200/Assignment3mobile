import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Assignment3 = () => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [fact, setFact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const months = [
    { id: '1', name: 'January' },
    { id: '2', name: 'February' },
    { id: '3', name: 'March' },
    { id: '4', name: 'April' },
    { id: '5', name: 'May' },
    { id: '6', name: 'June' },
    { id: '7', name: 'July' },
    { id: '8', name: 'August' },
    { id: '9', name: 'September' },
    { id: '10', name: 'October' },
    { id: '11', name: 'November' },
    { id: '12', name: 'December' },
  ];


  useEffect(() => {
    if (month && day) {
      const apiUrl = `https://numbersapi.p.rapidapi.com/${month}/${day}/date?json=true`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com',
          'X-RapidAPI-Key': '9bfec4f1f7mshe5482c908cf3e70p12b588jsn886204d432c1', 
        },
      };

      fetch(apiUrl, options)
        .then((response) => response.json())
        .then((data) => {
          setFact(data.text); 
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [month, day]); 

 
  const handleMonthSelect = (monthId) => {
    setMonth(monthId);
    setModalVisible(false); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Month </Text>

     
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownText}>
          {month ? months.find((m) => m.id === month)?.name : 'Select a Month'}
        </Text>
      </TouchableOpacity>

     
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.dropdownContainer}>
            <FlatList
              data={months}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.monthItem} onPress={() => handleMonthSelect(item.id)}>
                  <Text style={styles.monthText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <Text style={styles.heading}>Enter Day</Text>

      
      <TextInput
        style={styles.input}
        placeholder="Enter Day"
        keyboardType="numeric"
        value={day}
        onChangeText={setDay}
      />

      
{fact && (
        <View style={styles.factContainer}>
          <Text style={styles.fact}>{fact}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 80,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30, 
  },
  dropdownButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  dropdownText: {
    color: '#fff',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    width: 250,
    borderRadius: 5,
    padding: 10,
  },
  monthItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  monthText: {
    fontSize: 18,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingLeft: 10,
  },
  factContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#d0e8ff',
    borderLeftWidth: 4,
    borderColor: '#007aff',
    borderRadius: 5,
    width: 300,
  },
  fact: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Assignment3;
