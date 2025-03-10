'use client';

import { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';

const API_HOST = 'numbersapi.p.rapidapi.com';
const API_KEY = ' 9bfec4f1f7mshe5482c908cf3e70p12b588jsn886204d432c1'; 

export default function Home() {
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [fact, setFact] = useState('');

  useEffect(() => {
    if (month && day) {
      fetchFact(month, day);
    }
  }, [month, day]);

  const fetchFact = async (selectedMonth, selectedDay) => {
    try {
      const response = await fetch(
        `https://${API_HOST}/${selectedMonth}/${selectedDay}/date?json`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Host': API_HOST,
            'X-RapidAPI-Key': API_KEY,
          },
        }
      );
      const data = await response.json();
      setFact(data.text);
    } catch (error) {
      console.error('Error fetching fact:', error);
      setFact('Failed to load fact.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f3f3', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Historical Facts by Date</Text>
      
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, width: 300 }}>
        <Text style={{ marginBottom: 10 }}>Enter Month:</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}
          keyboardType="numeric"
          maxLength={2}
          value={month.toString()}
          onChangeText={(text) => setMonth(Number(text) || 1)}
        />

        <Text style={{ marginTop: 20, marginBottom: 10 }}>Enter Day:</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}
          keyboardType="numeric"
          maxLength={2}
          value={day.toString()}
          onChangeText={(text) => setDay(Number(text) || 1)}
        />
      </View>

      {fact && (
        <View style={{ marginTop: 20, padding: 15, backgroundColor: '#d0e8ff', borderLeftWidth: 4, borderColor: '#007aff', borderRadius: 5, width: 300 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{fact}</Text>
        </View>
      )}
    </View>
  );
}
