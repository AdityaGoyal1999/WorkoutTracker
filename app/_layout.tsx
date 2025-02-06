import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot } from "expo-router";
import { ThemeProvider } from "@/context/ThemeContext";
// import { useColorScheme } from "@/hooks/useColorScheme";
import { BottomSheetProvider } from "@/context/BottomSheetContext";

// Import your global CSS file
import "../global.css";


export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <BottomSheetProvider>
                    <Slot />
                </BottomSheetProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    )
}
