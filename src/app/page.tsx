// "use client";
import type { Metadata } from 'next';
import React from 'react';
import HomePage from '@/containers/Home';

import { appWithTranslation } from 'next-i18next';

export const metadata: Metadata = {
    title: 'Bel-Geek.com - Тэхналогіі і Навука На Беларускай Мове',
    description: 'Bel-Geek.com - Тэхналогіі і Навука На Беларускай Мове',
};

export default async function Home({ ...props }) {
    return <HomePage route={{ userIsAuth: true }} {...props} />;
}
