import { View, ScrollView } from 'react-native';
import { dummyWorkouts } from '@/data/dummyData';
import { Text, Button } from '@rneui/themed';
import { useBottomSheet } from '@/context/BottomSheetContext';
import { ExercisePage } from '@/components/ExercisePage';

export const StartWorkoutPage = ({ workout }: { workout: string }) => {
    const { addBottomSheet } = useBottomSheet();

    return (
        <ScrollView className="flex-1 p-4">
            <Text h2>{ workout }</Text>
            {
                workout in dummyWorkouts && dummyWorkouts[workout].length > 0 ?
                <Button title="Start Workout" onPress={() => {
                    addBottomSheet(<ExercisePage exercises={dummyWorkouts[workout]} workoutName={workout} />)
                }} />
                : <Text>Button is getting hidden</Text>
            }
            {
                workout in dummyWorkouts ?
                dummyWorkouts[workout].map((exercise, index) => (
                    <View key={index}>
                        <Text className="my-2 bg-red-100 p-4 rounded-lg">{ exercise }</Text>
                    </View>
                ))
                :
                <Text>No exercises found</Text>
            }
        </ScrollView>
    )
}