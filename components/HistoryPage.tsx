import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dummyHistory } from '@/data/dummyData';

export const HistoryPage = ({ exercise }: { exercise: string}) => (
  <ScrollView className="flex-1 bg-white p-4">
    {
        exercise in dummyHistory ?
        dummyHistory[exercise].map((dayHistory, index) => (
            <View key={index} className="my-4">
                <Text>{dayHistory.date}</Text>
                {
                    dayHistory.times.map((set, index) => {
                        return (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>{index + 1}</Text>
                                <Text>{set.reps}</Text>
                                <Text>{set.weight}</Text>
                            </View>
                        )
                    })
                }
            </View>
        ))
        :
        <Text>You're yet to do this exercise</Text>
    }
  </ScrollView>
);