import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { HistoryPage } from "@/components/HistoryPage"

const InfoRoute = () => (
  <ScrollView className="flex-1 bg-white p-4">
    <Text>Info</Text>
  </ScrollView>
);

const InstructionsRoute = ({ exercise }: { exercise: any }) => (
  <ScrollView className="flex-1 bg-white p-4">
    <Text>{exercise.name}</Text>
    <Image 
      source={{ uri: exercise.gifUrl }} 
      style={{ width: '100%', height: 300 }} 
      className="border-2 border-gray-200 rounded-lg my-4"
    />
    {
      exercise.instructions.map((instruction: any, index: any) => (
        <Text key={index} className="flex-row items-start my-2">
          • {instruction}
        </Text>
      ))
    }
  </ScrollView>
);

// const HistoryRoute = () => (
//     <ScrollView className="flex-1 bg-white p-4">
        
//     </ScrollView>
// )

export default function WorkoutDetails({ exercise }: { exercise: any }) {
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = [
    { key: 'info', title: 'Info', component: InfoRoute },
    { key: 'instructions', title: 'Instructions', component: () => <InstructionsRoute exercise={exercise} /> },
    { key: 'history', title: 'History', component: () => <HistoryPage exercise={exercise} /> },
  ];

  return (
    <View className="flex-1 px-4">
      <Text className="text-2xl font-bold">{exercise.name}</Text>
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

