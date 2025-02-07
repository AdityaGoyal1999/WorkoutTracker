import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { format, addDays, startOfWeek } from 'date-fns';
import { useTheme } from '@rneui/themed';
import { useBottomSheet } from '@/context/BottomSheetContext';
import { Calendar } from 'react-native-calendars';

const CalendarView = ({ onDaySelect }: { onDaySelect: (date: Date) => void }) => {
  const { theme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  // Generate an array of months (e.g., current month + 11 months)
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(selectedMonth);
    date.setMonth(date.getMonth() + i);
    return date;
  });
  
  return (
    <ScrollView 
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      {months.map((month, index) => (
        <View key={index} className="px-4 pb-4">
          <Text className="text-lg font-bold mb-2">
            {format(month, 'MMMM yyyy')}
          </Text>
          <Calendar
            current={format(month, 'yyyy-MM-dd')}
            onDayPress={(day) => {
              onDaySelect(new Date(day.timestamp));
            }}
            hideArrows={true}
            hideExtraDays={true}
            theme={{
              todayTextColor: theme.colors.primary,
              selectedDayBackgroundColor: theme.colors.primary,
              textMonthFontWeight: 'bold',
              textMonthFontSize: 0, // Hide the default month text
              'stylesheet.calendar.main': {
                week: {
                  marginTop: 2,
                  marginBottom: 2,
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }
              }
            }}
            enableSwipeMonths={false}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default function WeekStrip() {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const { addBottomSheet } = useBottomSheet();
  
  const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
  
  const handleDaySelect = (date: Date) => {
    setSelectedDate(date);
  };

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfCurrentWeek, i);
    const dayNumber = format(date, 'd');
    const dayName = format(date, 'EEE');
    const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

    return {
      date,
      dayName,
      dayNumber,
      isSelected,
    };
  });

  return (
    <View className="bg-white py-2">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {days.map((day, index) => (
          <TouchableOpacity 
            key={index} 
            className="items-center mx-3"
            onPress={() => {
              if (day.isSelected) {
                addBottomSheet(<CalendarView onDaySelect={(date) => {
                  handleDaySelect(date);
                  // Close bottom sheet after selection
                  setTimeout(() => {
                    // Small delay to show the selection
                    addBottomSheet(null);
                  }, 300);
                }} />);
              } else {
                handleDaySelect(day.date);
              }
            }}
          >
            <Text className={`text-sm mb-1 ${day.isSelected ? 'text-black font-bold' : 'text-gray-400'}`}>
              {day.dayName}
            </Text>
            <View 
              style={{
                width: 35,
                height: 35,
                borderRadius: 17.5,
                backgroundColor: day.isSelected ? theme.colors.primary : 'transparent',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text 
                className={day.isToday ? 'text-white font-bold' : 'text-gray-400'}
              >
                {day.dayNumber}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
} 