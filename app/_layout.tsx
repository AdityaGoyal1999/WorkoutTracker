import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot } from "expo-router";
import { ThemeProvider } from "@/context/ThemeContext";
// import { useColorScheme } from "@/hooks/useColorScheme";
import { BottomSheetProvider } from "@/context/BottomSheetContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoginScreen from "@/app/screens/LoginScreen";

// Import your global CSS file
import "../global.css";

function AppContent() {
    const { user, loading } = useAuth();
    if (loading) {
        return null;
    }
    return user ? <Slot /> : <LoginScreen />;
}

export default function RootLayout() {
    
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <ThemeProvider>
                    <BottomSheetProvider>
                        <AppContent />
                    </BottomSheetProvider>
                </ThemeProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    )
}
