import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/modules/store/clientStore';
import ThemeRegistryProvider from './ThemeRegistry';

export const ThemeRegistry = ThemeRegistryProvider;

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};
