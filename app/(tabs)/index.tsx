import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, Button, useTheme } from '@rneui/themed';
import { useThemeContext } from '@/context/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { dummyWorkouts } from '@/data/dummyData';
import { useBottomSheet } from '@/context/BottomSheetContext';
import WorkoutDetails from '@/components/WorkoutDetails';

import WeekStrip from '@/components/WeekStrip';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StartWorkoutPage } from '@/components/StartWorkoutPage';

import { EditExercses } from '@/components/EditExercises';


// TODO: To be made dynamic later down the line
const userId = "testId1";
const planId = "uk7BRZjNKPOYmVGtBfDw"

export default function HomeScreen() {
  const { theme } = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const { addBottomSheet } = useBottomSheet();
  const [workouts, setWorkouts] = useState([])
  const [planName, setPlanName] = useState("Exercise Plan")

  const DummyContent = () => (
    <View>
      <Text>Dummy Content</Text>
    </View>
  );

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('https://getexerciseplan-sc2vtzlvkq-uc.a.run.app?userId=' + userId + '&planId=' + planId);

        // TODO: add later
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }

        const data = await response.json();
        console.log(data)
        setWorkouts(data.exercises)
        setPlanName(data.name)
        // console.log(data); // You can replace this with any state update or processing logic
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };
  
    fetchExercises();
  }, []);

  const DummyWorkout = ({ workout }: { workout: string }) => {
    let workoutList: string[] = [];
    if (workout in dummyWorkouts){
      workoutList = dummyWorkouts[workout];
    }
  


    return (
      <View>
        <Text>{workout}</Text>
        {workoutList.length > 0 
          ? workoutList.map((w: string, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => addBottomSheet(<WorkoutDetails exercise={w} />)}
              >
                <View className="bg-red-100 p-2 rounded-lg">
                  <Text>{w}</Text>
                </View>
              </TouchableOpacity>
            ))
          : <Text>No workouts found</Text>
        }
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <WeekStrip />
        <View className="bg-yellow-100 mx-2">
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold text-2xl">{ planName }</Text>
            <TouchableOpacity className="border-4 border-orange-400 p-2 rounded-xl" onPress={() => addBottomSheet( <EditExercses />)}>
              <Ionicons name="pencil-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="gap-4 my-4 m-2 p-4 rounded-lg border-2 border-gray-500">
            {
              workouts?.map((workout, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => {
                    if (workout.complete){
                      addBottomSheet(<DummyWorkout workout={workout.name}/>)
                    }
                    else {
                      addBottomSheet(<StartWorkoutPage workout={workout.name} />)
                    }
                  }}
                >
                  <View key={index} className="p-2 rounded-lg flex-row items-center">
                    {
                      workout.complete ?
                      <Ionicons name="checkmark-circle-outline" size={24} color="black" />
                      :
                      <Ionicons name="ellipse-outline" size={24} color="black" />
                    }
                    <Text>{workout.name}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
