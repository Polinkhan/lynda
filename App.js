import { Center, NativeBaseProvider } from "native-base";
import Auth from "./components/Auth/Auth";
import DataContextProvider from "./contexts/DataContext";

export default function App() {
  return (
    <NativeBaseProvider>
      <DataContextProvider>
        <Auth />
      </DataContextProvider>
    </NativeBaseProvider>
  );
}
