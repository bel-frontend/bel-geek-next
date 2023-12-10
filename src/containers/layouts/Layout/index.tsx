import React, { createElement } from 'react';
import { Container, Box } from '@mui/material';
import Script from 'next/script';

import { Header, Footer } from '@/components';
import { ScrollToTop } from './components/ScrollToTop';
import { useSelector } from 'react-redux';
import { currentUserIsAuth } from '@/modules/auth';
import { getViewport } from '@/modules/viewport';
import { useRouter } from 'next/navigation';
import BuyMeACofee from './components/BuyMeACoffe';

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
            <Container maxWidth={maxWidth}>
                <Box display={'flex'} justifyContent={'flex-end'}>
                    <BuyMeACofee isMobile={isMobile} />
                </Box>
            </Container>
            <Container maxWidth={maxWidth} sx={{ minHeight: '80vh' }}>
                {children}
            </Container>
            {showFooter ? <Footer /> : null}
        </>
    );
};
