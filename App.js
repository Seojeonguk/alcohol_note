import Navigation from './components/navigation/Index';
import store from './redux/store';

import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}
