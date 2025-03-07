import React, { useState } from "react";
import { View, Text, Image, Button } from "react-native" 
import { Input } from "@rneui/themed"
import { launchImageLibrary } from "react-native-image-picker";


export const PersonalInfo = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleChoosePhoto = () => {
        // launchImageLibrary({ mediaType: 'photo' }, (response) => {
        //     if (response.assets && response.assets.length > 0) {
        //         setImageUri(response.assets[0].uri);
        //     }
        // });
        console.log("Trying to add image")
    };

    return (
        <View className="flex-1 bg-red-100 mx-2 gap-2">
            <Text className="text-3xl">Edit Personal Information</Text>

            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
            )}
            <Button title="Upload Image" onPress={handleChoosePhoto} />

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
            <Input
                placeholder="Measurement Unit"
            />
            <Button title="Save Unit" />
        </View>
    )
}