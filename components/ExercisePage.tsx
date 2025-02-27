import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useBottomSheet } from '@/context/BottomSheetContext';
import { dummyWorkouts } from '@/data/dummyData';

interface Set {
  number: number;
  weight: number;
  reps: number;
  oneRM: number;
  completed: boolean;
}

interface ExercisePageProps {
  exercises: any[];
  workoutName: string;
}

interface ExerciseProgress {
  exerciseName: string;
  workoutName: string;
  userId: string;
  sets: Set[];
}

// If we've come to this point, workoutName exists in dummyWorkouts


export const ExercisePage = ({ exercises, workoutName }: ExercisePageProps) => {
  const { addBottomSheet, removeBottomSheet } = useBottomSheet();
  const [activeExercise, setActiveExercise] = useState(0)

  const [sets, setSets] = useState<Set[]>([
    { number: 1, weight: 90, reps: 12, oneRM: 94.5, completed: false },
    { number: 2, weight: 90, reps: 12, oneRM: 94.5, completed: false },
    { number: 3, weight: 90, reps: 12, oneRM: 94.5, completed: false },
  ]);


  const [exerciseProgress, setExerciseProgress] = useState<ExerciseProgress[]>([]);

  useEffect(() => {
    console.log(exercises)
    const initialProgress = exercises.map((exercise) => ({
      exerciseName: exercise,
      workoutName: workoutName,
      userId: "testId1", // Replace with actual user ID if available
      sets: [
        { number: 1, weight: 90, reps: 12, oneRM: 94.5, completed: false },
        { number: 2, weight: 90, reps: 12, oneRM: 94.5, completed: false },
        { number: 3, weight: 90, reps: 12, oneRM: 94.5, completed: false },
      ],
    }));
    setExerciseProgress(initialProgress);
  }, [exercises, workoutName]);

  const updateSet = (exerciseIndex: number, setIndex: number, field: 'weight' | 'reps', value: number) => {
    const updatedProgress = [...exerciseProgress];
    updatedProgress[exerciseIndex].sets[setIndex][field] = value;
    setExerciseProgress(updatedProgress);
  };

  const toggleSetCompletion = (exerciseIndex: number, setIndex: number) => {
    const updatedProgress = [...exerciseProgress];
    const set = updatedProgress[exerciseIndex].sets[setIndex];
    set.completed = !set.completed;
    setExerciseProgress(updatedProgress);
  };

  const exerciseOptions = () => {
    let bottomSheetId: number;
    const content = (
      <View className="flex-1">
        <Text h3>Complete Exercise</Text>
        <Button title="Yes" onPress={() => console.log("Yes")} />
        <Button title="No" onPress={() => bottomSheetId && removeBottomSheet(bottomSheetId)} />
      </View>
    );
    bottomSheetId = addBottomSheet(content);
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View>
        {/* Header */}
        <Text className="text-2xl font-bold text-blue-500">
          <Text>{workoutName}</Text>
          <Text> 🔧</Text>
        </Text>
        
        {/* Exercise Images */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="flex-row gap-2 my-4"
        >
          {exerciseProgress.map((exercise, exerciseIndex) => (
            <TouchableOpacity 
              key={exerciseIndex} 
              className="mx-4"
              onPress={() => setActiveExercise(exerciseIndex)} 
            >
              <View className="w-16 h-16 rounded-2xl bg-gray-200 justify-center items-center">
                <Text>{exercise.exerciseName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="p-4">
          {/* Exercise Title */}
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold">{exercises[activeExercise]}</Text>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={24} color="black" onPress={exerciseOptions}/>
            </TouchableOpacity>
          </View>

          {/* Machine & Reps Info */}
          <View className="flex-row items-center mt-2">
            <Ionicons name="fitness-outline" size={20} color="gray" />
            <Text className="text-gray-500 ml-1">Machine</Text>
            <Text className="text-gray-500 ml-4">12 reps</Text>
          </View>

          {/* Warm-up Sets Badge */}
          <View className="mt-4">
            <View className="bg-gray-100 self-start px-4 py-2 rounded-full">
              <Text className="text-gray-500">2 warm-up sets</Text>
            </View>
          </View>

          {/* Sets Table */}
          <View className="mt-6">
            {/* Table Header */}
            <View className="flex-row justify-between mb-4">
              <Text className="font-semibold">#</Text>
              <Text className="font-semibold">LB</Text>
              <Text className="font-semibold">REPS</Text>
              <View style={{ width: 24 }} /> {/* Spacer for checkmark */}
            </View>

            {/* Sets */}
            {exerciseProgress[activeExercise]?.sets.map((set, setIndex) => (
                <TouchableOpacity 
                  key={setIndex}
                  onPress={() => toggleSetCompletion(setIndex)}
                  className="flex-row justify-between items-center mb-4"
                >
                  <Text className={set.completed ? "text-gray-400" : ""}>{set.number}</Text>
                  <TextInput
                    style={{ width: 40, textAlign: 'center', backgroundColor: '#ffcccc' }}
                    value={String(set.weight)}
                    onChangeText={(text) => updateSet(activeExercise, setIndex, 'weight', parseFloat(text) || 0)}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={{ width: 40, textAlign: 'center', backgroundColor: '#ffcccc' }}
                    value={String(set.reps)}
                    onChangeText={(text) => updateSet(activeExercise, setIndex, 'reps', parseInt(text) || 0)}
                    keyboardType="numeric"
                  />
                  <View className="w-6 h-6 justify-center items-center">
                    {set.completed ? (
                      <Ionicons name="checkmark-circle" size={24} color="#4ade80" />
                    ) : (
                      <View className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}

          </View>

          {/* History Section */}
          <View className="mt-8 bg-gray-50 p-4 rounded-lg">
            <Text className="text-gray-500 mb-2">
              <Text>Sat, Jan 11th · </Text>
              <Text>{workoutName}</Text>
            </Text>
            {sets.map((set, index) => (
              <View key={index} className="flex-row justify-between mb-2">
                <Text className="text-gray-500">{set.number}</Text>
                <Text className="text-gray-500">{set.weight}</Text>
                <Text className="text-gray-500">{set.reps}</Text>
                {/* <Text className="text-gray-500">{set.oneRM}</Text> */}
              </View>
            ))}
          </View>

          {/* Help Button */}
          <TouchableOpacity className="mt-8">
            <Text className="text-blue-500 text-lg">Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};