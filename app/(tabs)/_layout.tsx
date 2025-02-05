import { View, SafeAreaView } from 'react-native';
import { Text, useTheme, Button } from '@rneui/themed';
import { useThemeContext } from '@/context/ThemeContext';


export default function TabLayout() {
  const { toggleTheme, mode } = useThemeContext();
  const { theme } = useTheme();

  return (
    <SafeAreaView 
      style={{ 
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20
      }}>
      <Text h1>Hello World - Layout</Text>
      <Text style={{ color: theme.colors.primary }}>Current Theme: {mode}</Text>

      <Button 
        title="Toggle Theme"
        onPress={toggleTheme}
        containerStyle={{ marginTop: 20, marginHorizontal: 20 }}
        buttonStyle={{ backgroundColor: '#0a7ea4'}}
      />
    </SafeAreaView>
  );
}