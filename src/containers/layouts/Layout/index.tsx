import React, { createElement } from 'react';
import { Container } from '@mui/material';

import { Header, Footer } from '@/components';
import { ScrollToTop } from './components/ScrollToTop';
import { useSelector } from 'react-redux';
import { currentUserIsAuth } from '@/modules/auth';
import { getViewport } from '@/modules/viewport';
import { useRouter } from 'next/navigation';

export const Layout = ({ children, ...props }: any) => {
    const {
        showHeader = true,
        isMobile = false,
        showFooter = true,
        maxWidth = 'lg',
    } = props;
    const userIsAuth = useSelector(currentUserIsAuth);
    const viewPort = useSelector(getViewport);
    const history = useRouter();
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
