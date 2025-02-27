import { View, SafeAreaView, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { dummyWorkouts } from '@/data/dummyData';
import { useBottomSheet } from '@/context/BottomSheetContext';
import WorkoutDetails from '@/components/WorkoutDetails';
import { getExercises, searchExercises } from '@/data/exerciseDB';
import { Button } from '@rneui/base';


export default function TabTwoScreen() {
  const [search, setSearch] = useState('');
  const { addBottomSheet } = useBottomSheet();
  const [exercises, setExercises] = useState([]);

  const updateSearch = (text: string) => {
    setSearch(text);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch('https://getexercises-sc2vtzlvkq-uc.a.run.app');
      const data = await response.json()
      setExercises(data);
    };
    if (search === '') fetchExercises();
  }, [search]);

  const handleSearch = async () => {
    try {
      const encodedSearch = encodeURIComponent(search);  // handle multiple words in search bar
      const response = await fetch(`https://searchexercises-sc2vtzlvkq-uc.a.run.app?name=${encodedSearch}`);
      const data = await response.json();
      setExercises(data)
    }
    catch (error) {
      console.error("Error searching exercises:", error);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <View
        className="px-4 flex-1"
      >
        <SearchBar
          placeholder="Search exercises..."
          onChangeText={updateSearch}
          value={search}
          platform="ios"
          containerStyle={{
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          inputContainerStyle={{
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
          }}
          inputStyle={{
            color: '#000',
          }}
          placeholderTextColor="#666"
          searchIcon={<Ionicons name="search" size={24} color="#666" />}
          clearIcon={<Ionicons name="close" size={24} color="#666" />}
        />
        <Button
          title="Search"
          onPress={handleSearch}
        />

        {/* <Text className="text-2xl font-bold">{search}</Text> */}
        <ScrollView>

          {
            exercises.map((exercise, index) => (
              <TouchableOpacity key={index}>
                <Text 
                  className="bg-red-200 p-2 rounded-lg my-2"
                  onPress={() => addBottomSheet(<WorkoutDetails exercise={exercise}/>)}
                >{exercise.name}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

