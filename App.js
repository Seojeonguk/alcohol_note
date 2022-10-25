import Navigation from './components/navigation/Index';
import store from './components/redux/store';

import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}
