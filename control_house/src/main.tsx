import { createRoot } from 'react-dom/client'
import App from '@/App'
import '@/index.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { home_api } from './state/home_api';


export const store = configureStore({
  reducer: {[home_api.reducerPath]: home_api.reducer },
  middleware: (getDefault) => getDefault().concat(home_api.middleware),
})


setupListeners(store.dispatch);


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
