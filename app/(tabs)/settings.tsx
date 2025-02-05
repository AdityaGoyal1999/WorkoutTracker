import { Text, View, SafeAreaView } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";
import { Button } from "@rneui/themed";
export default function Settings() {

  const { mode, toggleTheme } = useThemeContext();

  return (
    <SafeAreaView>
      <Text>Settings</Text>

        <Button
            title="Toggle Theme"
            onPress={toggleTheme}
            buttonStyle={{ backgroundColor: '#0a7ea4' }}
        />
    </SafeAreaView>

  );
}