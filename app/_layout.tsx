import { Slot } from "expo-router";
import { ThemeProvider } from "@/context/ThemeContext";
// import { useColorScheme } from "@/hooks/useColorScheme";

// Import your global CSS file
import "../global.css";


export default function RootLayout() {
    return (
        <ThemeProvider>
            <Slot />
        </ThemeProvider>
    )
}
