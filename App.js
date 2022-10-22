import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './components/navigation/Index';

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
