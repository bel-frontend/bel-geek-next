'use client';
import React from 'react';
import { Container, Box } from '@mui/material';

import { Header, Footer } from '@/components';
import { ScrollToTop } from './components/ScrollToTop';
import { useSelector } from 'react-redux';
import { currentUserIsAuth } from '@/modules/auth';
import { getViewport } from '@/modules/viewport';
import { useRouter } from 'next/navigation';

export const Layout = ({ children, ...props }: any) => {
    const { showHeader = true, showFooter = true, maxWidth = 'md' } = props;

    const userIsAuth = useSelector(currentUserIsAuth);
    const viewPort = useSelector(getViewport);
    const history = useRouter();
    const { isMobile } = viewPort;
    return (
        <>
            {showHeader !== false ? (
                <Header
                    isMobile={isMobile}
                    history={history}
                    userIsAuth={userIsAuth}
                />
            ) : null}
            <ScrollToTop viewPort={viewPort} />

            <Container maxWidth={maxWidth} sx={{ minHeight: '80vh' }}>
                {children}
            </Container>
            {showFooter ? <Footer /> : null}
        </>
    );
};
