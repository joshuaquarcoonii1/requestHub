import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import RequestHubScreen from './screens/RequestHubScreen';

export default function App() {
  return (
    <PaperProvider>
      <RequestHubScreen />
    </PaperProvider>
  );
}
