// "use client";
import React from 'react';
import HomePage from '@/containers/Home';

export default async function Home({ ...props }) {
    return <HomePage route={{ userIsAuth: true }} {...props} />;
}
