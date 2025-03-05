import { Text, TouchableOpacity, Touchable, View } from "react-native"
// import { workouts } from "@/data/dummyData"
import { Input, Button } from "@rneui/themed"
import { Ionicons } from "@expo/vector-icons"
import { useState, useEffect } from "react"

const userId = "testId1";
const planId = "uk7BRZjNKPOYmVGtBfDw";

export const EditExercses = () => {
    const [planName, setPlanName] = useState("") // exercise plan new name
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
              const response = await fetch('https://getexerciseplan-sc2vtzlvkq-uc.a.run.app?userId=' + userId + '&planId=' + planId);
      
              // TODO: add later
              // if (!response.ok) {
              //   throw new Error('Network response was not ok');
              // }
      
              const data = await response.json();
            //   console.log(data)
              setWorkouts(data.exercises)
              setPlanName(data.name)
              // console.log(data); // You can replace this with any state update or processing logic
            } catch (error) {
              console.error('Error fetching exercises:', error);
            }
          };
        
          fetchExercises();
    }, [])

    const handleSave = async () => {
        // try {
        //     console.log(userId)
        //     const response = await fetch('http://127.0.0.1:5001/workouttracker-4a458/us-central1/createExercisePlan', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             userId: userId, // Replace with actual user ID
        //             exercisePlan: {
        //                 name: planName || "Push Pull Workout",
        //                 exercises: workouts
        //             }
        //         }),
        //     });

        //     console.log("Trying to data to database")

        //     const data = await response.json();
        //     console.log('Exercise plan created successfully:', data);
        // } catch (error) {
        //     console.error('Error creating exercise plan:', error);
        // }
        console.log("Handle the save functionality")
    }

    return (
        <View className="flex-1 mx-2 gap-4">
            <Text className="text-2xl">Edit Your Exercises</Text>
            <Text>Change the name of your workouts</Text>
            <Input placeholder="Push Pull Workouts" onChangeText={(newText) => {
                setPlanName(newText); // TODO: check if there's an efficient way of doing this
            }} />
            <Button 
                title="Save" 
                buttonStyle={{
                    backgroundColor: 'rgba(78, 116, 289, 1)',
                    borderRadius: 3,
                  }}
                  containerStyle={{
                    marginHorizontal: 50,
                  }}

                // TODO: remove this. It's a one time thing
                // onPress={() => console.log("Trying to save plan's new name")}
                onPress={handleSave} 
            />
            {
                workouts.map((workout, index) => (
                    <View key={index} className="bg-red-100 flex-row items-center justify-between p-4 ">
                        <Text 
                        className="text-xl"
                        >
                            {workout.name}
                        </Text>
                        <View className="flex-row">
                            <TouchableOpacity
                                onPress={() => console.log("Trying to edit exercise")}
                            >
                                <Ionicons name="pencil-outline" size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => console.log("Trying to delete exercise from plan")}
                            >
                                <Ionicons name="close-outline" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                ))
            }
        </View>
    )
}