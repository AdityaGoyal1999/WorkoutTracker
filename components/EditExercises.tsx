import { Text, TouchableOpacity, Touchable, View } from "react-native"
import { workouts } from "@/data/dummyData"
import { Input, Button } from "@rneui/themed"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"

export const EditExercses = () => {
    const [planName, editPlanName] = useState("") // exercise plan new name

    return (
        <View className="flex-1 mx-2 gap-4">
            <Text className="text-2xl">Edit Your Exercises</Text>
            <Text>Change the name of your workouts</Text>
            <Input placeholder="Push Pull Workouts" onChangeText={(newText) => {
                editPlanName(newText); // TODO: check if there's an efficient way of doing this
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
                onPress={() => console.log("Trying to save plan's new name")}
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