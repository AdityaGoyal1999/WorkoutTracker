import { View, SafeAreaView, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { dummyWorkouts } from '@/data/dummyData';
import { useBottomSheet } from '@/context/BottomSheetContext';
import WorkoutDetails from '@/components/WorkoutDetails';


export default function TabTwoScreen() {
  const [search, setSearch] = useState('');
  const { addBottomSheet } = useBottomSheet();

  const updateSearch = (text: string) => {
    setSearch(text);
  };

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

        <Text className="text-2xl font-bold">{search}</Text>
        <ScrollView>
          {
            Object.keys(dummyWorkouts).map((workout, index) => (
              <View key={index}>
                {
                  dummyWorkouts[workout].map((exercise, index) => (
                    <TouchableOpacity 
                      key={index} 
                      className="bg-red-200 p-2 rounded-lg my-2"
                      onPress={() => addBottomSheet(<WorkoutDetails exercise={exercise}/>)}
                    >
                      <Text className="text-lg">{exercise}</Text>
                    </TouchableOpacity>
                  ))
                }
              </View>
            ))
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

