import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Text, Button, useTheme } from '@rneui/themed';
import { useThemeContext } from '@/context/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import CustomBottomSheet from '@/components/CustomBottomSheet';
import { dummyWorkouts } from '@/data/dummyData';
import { useBottomSheet } from '@/context/BottomSheetContext';
import WorkoutDetails from '@/components/WorkoutDetails';


const workouts = [
  'Biceps',
  'Triceps',
  'Legs',
  'Back',
  'Shoulders',
  'Chest',
  'Core',
  'Cardio',
]

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
        <View style={{ padding: 20 }}>
          <Button 
            title="Open Bottom Sheet"
            onPress={() => {
              console.log("Bottom Sheet Invoked")
              addBottomSheet(<DummyContent />)
            }}
            buttonStyle={{ backgroundColor: theme.colors.primary }}
          />
        </View>
        
        <View>
          <Text>Push Pull Workouts</Text>
          <View className="gap-4 my-4 bg-red-200 p-4 rounded-lg">
            {
              workouts.map((workout, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => addBottomSheet(<DummyWorkout workout={workout}/>)}
                >
                  <View key={index} className="bg-red-400 p-2 rounded-lg">
                    <Text>{workout}</Text>
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
