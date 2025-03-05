import { View, Text, ScrollView } from "react-native"
import { Input, Button } from "@rneui/themed"

export const EditExerciseGroup = () => {

    return (
        <View className="flex-1">
            <Text className="text-3xl">Edit Exercise Group</Text>
            <Input 
                placeholder="Enter Exercise"
            />
            <Button 
                title="Save Name" 
                buttonStyle={{
                    backgroundColor: 'rgba(78, 116, 289, 1)',
                    borderRadius: 3,
                  }}
                  containerStyle={{
                    marginHorizontal: 50,
                  }}

                // TODO: remove this. It's a one time thing
                // onPress={() => console.log("Trying to save plan's new name")}
                // onPress={handleSave} 
            />
            {/* <ScrollView className="bg-red-300">
                <Text>Something</Text>
                <Text>Something</Text>
                <Text>Something</Text>
                <Text>Something</Text>
                <Text>Something</Text>
            </ScrollView> */}
            
        </View>
    )
}