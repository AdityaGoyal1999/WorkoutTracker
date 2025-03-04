import { View, SafeAreaView } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";
import { Button, Text } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import { logout } from "@/auth/authServices";
import { useAuth } from "@/context/AuthContext";

export default function Settings() {

  const { mode, toggleTheme } = useThemeContext();
  const { user } = useAuth();

  return (
    <SafeAreaView className="mx-4 flex-1">
      <Text h1>Settings</Text>
      
      <View className="flex-row justify-center items-center my-4">
        <Avatar
          size={100}
          rounded
          source={{ uri: 'https://github.com/brunogallotte.png' }}
        />
      </View>
      <Text className="text-lg font-bold">{user?.email}</Text>
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
          title="Edit Profile"
          onPress={console.log("Profile Page is being editted")}
          style={{ marginTop: 20 }}
          buttonStyle={{ backgroundColor: '#0a7ea4' }}
      />

      <Button 
        title="Logout"
        style={{ marginTop: 20 }}
        onPress={logout}
        buttonStyle={{ backgroundColor: '#0a7ea4' }}
      />
      <Text>Version 1.0.0</Text>
    </SafeAreaView>

  );
}