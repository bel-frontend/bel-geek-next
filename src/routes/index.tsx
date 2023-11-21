export const redirectAuthPath = '/login';

export interface RouteItemInterface {
    path: string;
    exact: boolean;
    showHeader?: boolean;
    showFooter?: boolean;
    isPrivate?: boolean;
    layout?: any;
    maxWidth?: 'mg' | 'lg' | 'xl';
}

const mainRoutes: RouteItemInterface[] = [
    {
        path: '/',
        exact: true,
        showHeader: true,
    },
    {
        path: '/article/:id',
        exact: true,
        showHeader: true,
    },
    {
        path: '/login',
        exact: true,
        showHeader: false,
    },
    {
        path: '/register',
        exact: true,
        showHeader: false,
    },
    {
        path: '/editor/:id',
        exact: true,
        showHeader: true,
        isPrivate: true,
        maxWidth: 'xl',
    },
    {
        path: '/profile',
        exact: true,
        showHeader: true,
        isPrivate: true,
    },
    {
        path: '/contacts',
        exact: true,
        showHeader: true,
        isPrivate: false,
    },
    {
        path: '*',
        exact: false,
        showHeader: false,
        showFooter: false,
    },
];

export default mainRoutes;
