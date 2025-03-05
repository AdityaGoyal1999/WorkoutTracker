import { View, Text } from "react-native" 
import { Input, Button } from "@rneui/themed"


export const PersonalInfo = () => {

    return (
        <View className="flex-1 bg-red-100 mx-2 gap-2">
            <Text className="text-3xl">Edit Personal Information</Text>

            <Input 
                placeholder="Your Name"
            /> 
            <Button title="Save Name" />

            <Input 
                placeholder="Age"
            />
            <Button title="Save Age" />
            <Input
                placeholder="Body Weight"
            />
            <Button title="Save Weight" />
        </View>
    )
}