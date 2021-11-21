import "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import useCachedResources from "./hooks/useCachedResources"
import Navigation from "./navigation"
import { useFonts } from "expo-font"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import FlashMessage from "react-native-flash-message"
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'

let persistor = persistStore(store)

export default function App() {
	const isLoadingComplete = useCachedResources()
	let [fontsLoaded] = useFonts({
		"Manrope-Bold": require("./assets/fonts/Manrope-Bold.ttf"),
		"Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
		"Manrope-Medium": require("./assets/fonts/Manrope-Medium.ttf"),
	})

	if (!isLoadingComplete || !fontsLoaded) {
		return null
	} else {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<SafeAreaProvider>
						<Navigation />
						<StatusBar />
						<FlashMessage position="top" floating statusBarHeight={30} />
					</SafeAreaProvider>
				</PersistGate>
			</Provider>
		)
	}
}
