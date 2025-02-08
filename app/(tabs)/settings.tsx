import { View, SafeAreaView } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";
import { Button, Text } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import { logout } from "@/auth/authServices";

export default function Settings() {

  const { mode, toggleTheme } = useThemeContext();

  return (
    <SafeAreaView className="mx-4">
      <Text h1>Settings</Text>
      
      <View className="flex-row justify-center items-center my-4">
        <Avatar
          size={100}
          rounded
          source={{ uri: 'https://github.com/brunogallotte.png' }}
        />
      </View>

      <View className="flex-row my-4 gap-4 h-24">
        <View style={{ backgroundColor: '#0a7ea4', padding: 10, borderRadius: 10 }} className="flex-1 justify-center items-center">
          <Text>100</Text>
          <Text>Workouts</Text>
        </View>
        <View style={{ backgroundColor: '#0a7ea4', padding: 10, borderRadius: 10 }} className="flex-1 justify-center items-center">
          <Text>8</Text>
          <Text>Days Streak</Text>
        </View>
      </View>
      
      <Button
          title="Toggle Theme"
          onPress={toggleTheme}
          buttonStyle={{ backgroundColor: '#0a7ea4' }}
      />

      <Button 
        title="Logout"
        style={{ marginTop: 20 }}
        onPress={logout}
        buttonStyle={{ backgroundColor: '#0a7ea4' }}
      />
    </SafeAreaView>

  );
}