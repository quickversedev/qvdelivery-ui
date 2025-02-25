import Navigation from "./Navigation/Navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./store"; // Import your Redux store

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}
