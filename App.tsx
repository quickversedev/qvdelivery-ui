import Navigation from "./Navigation/Navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./store"; // Import your Redux store
import { Router } from "./src/routes/Router";
import { AuthProvider } from "./src/contexts/Auth";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </PaperProvider>
    </Provider>
  );
}
