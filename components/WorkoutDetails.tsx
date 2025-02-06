import { View } from 'react-native';
import { Text } from '@rneui/themed';
export default function WorkoutDetails({ exercise }: { exercise: string }) {
    return (
        <View className="flex-1 bg-red-100">
            <View className="flex-1 mx-4">
                <Text h4>{exercise}</Text>
            </View>
        </View>
    )
}