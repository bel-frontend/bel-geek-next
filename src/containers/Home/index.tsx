import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

import { EpisodePreview } from './components/EpisodePreview/';
import { USER_ROLES } from '@/constants/users';
import {
    getArticklesRequest,
    getArticklesSelector,
    getPinndedArticklesSelector,
    getPinnedArticlesRequest,
} from '@/modules/artickles';
import { getDataWrapper } from '@/modules/apiRoutes';
import Pagination from './components/Pagination';
import style from './style.module.scss';

const ARTICLES_PER_PAGE = 10;
const DEFAULT_PAGE_NUM = 1;

const Home = async ({
    route: { userIsAuth },
    searchParams: {
        searchText,
        page = DEFAULT_PAGE_NUM,
        size = ARTICLES_PER_PAGE,
    },
}: {
    route: { userIsAuth?: boolean };
    [key: string]: any;
}) => {
    const currentUser: any = {
        role: USER_ROLES.SUPERADMIN,
        user_id: 1,
        user_name: 'test',
        user_email: 'test',
        user_avatar: {},
    };
    const { articles, total } = await getDataWrapper(
        {
            requestAction: getArticklesRequest,
            resultSelector: getArticklesSelector,
        },
        { search: searchText, pageNum: page, pageSize: size },
    );

    const { articles: pinnedArticles } = await getDataWrapper(
        {
            requestAction: getPinnedArticlesRequest,
            resultSelector: getPinndedArticklesSelector,
        },
        { search: searchText },
    );

    const preparedArticles = (() => {
        return ([...pinnedArticles, ...articles] || []).filter(
            (i: any) =>
                i.isActive ||
                (!i.isActive && currentUser?.user_id === i?.meta?.user_id) ||
                currentUser.role === USER_ROLES.SUPERADMIN,
        );
    })();

    return (
        <>
            <Box component={'main'} className={style.main}>
                <a
                    className={style.telegram}
                    href="https://t.me/bel_frontend"
                    target="_blank"
                    rel="noreferrer"
                >
                    Далучайцеся да нашага Тэлеграм-канала
                </a>

                {preparedArticles &&
                    preparedArticles.map(
                        (
                            {
                                content,
                                meta,
                                id,
                                isActive,
                                likes,
                            }: {
                                content: string;
                                meta: any;
                                id: any;
                                isActive: boolean;
                                likes: any;
                            },
                            index: number,
                        ) =>
                            meta ? (
                                <EpisodePreview
                                    currentUser={currentUser}
                                    key={index}
                                    userIsAuth={userIsAuth}
                                    content={content}
                                    meta={meta}
                                    id={id}
                                    isActive={isActive}
                                    likes={likes}
                                />
                            ) : null,
                    )}
                <Pagination total={total} size={size} />
            </Box>
        </>
    );
};

export default Home;
