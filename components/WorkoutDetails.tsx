import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const InfoRoute = () => (
  <ScrollView className="flex-1 bg-white p-4">
    <Text>Info</Text>
  </ScrollView>
);

const InstructionsRoute = () => (
  <ScrollView className="flex-1 bg-white p-4">
    <Text>Instructions</Text>
  </ScrollView>
);

const HistoryRoute = () => (
    <ScrollView className="flex-1 bg-white p-4">
        <Text>History</Text>
    </ScrollView>
)

export default function WorkoutDetails({ exercise }: { exercise: string }) {
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = [
    { key: 'info', title: 'Info', component: InfoRoute },
    { key: 'instructions', title: 'Instructions', component: InstructionsRoute },
    { key: 'history', title: 'History', component: HistoryRoute },
  ];

  return (
    <View className="flex-1 px-4">
      <Text className="text-2xl font-bold">{exercise}</Text>
      <View className="flex-row border-b border-gray-200">
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.key}
            className={`flex-1 py-3 ${activeTab === index ? 'border-b-2 border-black' : ''}`}
            onPress={() => setActiveTab(index)}
          >
            <Text className={`text-center font-semibold ${activeTab === index ? 'text-black' : 'text-gray-500'}`}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-1">
        {
            tabs[activeTab].component()
        }
      </View>
    </View>
  );
}

