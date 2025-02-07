import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Text, Button, useTheme } from '@rneui/themed';
import { useThemeContext } from '@/context/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// import CustomBottomSheet from '@/components/CustomBottomSheet';
import { dummyWorkouts } from '@/data/dummyData';
import { useBottomSheet } from '@/context/BottomSheetContext';
import WorkoutDetails from '@/components/WorkoutDetails';
// import { CalendarList } from 'react-native-calendars';
import WeekStrip from '@/components/WeekStrip';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StartWorkoutPage } from '@/components/StartWorkoutPage';
import { workouts } from '@/data/dummyData';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const { addBottomSheet } = useBottomSheet();

  const DummyContent = () => (
    <View>
      <Text>Dummy Content</Text>
    </View>
  );

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
        <View>
          <Text>Push Pull Workouts</Text>
          <View className="gap-4 my-4 bg-red-200 p-4 rounded-lg">
            {
              workouts.map((workout, index) => (
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
                  <View key={index} className="bg-red-400 p-2 rounded-lg flex-row items-center">
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
