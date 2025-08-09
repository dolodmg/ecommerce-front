'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { CartProvider } from '@/components/cart';

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <CartProvider userId={1} autoInitialize={true}>
        {children}
      </CartProvider>
    </Provider>
  );
}