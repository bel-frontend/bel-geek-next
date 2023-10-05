import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

import { EpisodePreview } from './components/EpisodePreview/';
import style from './style.module.scss';
import { USER_ROLES } from '@/constants/users';
import { useDispatch, store, useSelector } from '@/modules/store';
import { getArticklesRequest, getArticklesSelector } from '@/modules/artickles';

const Home = ({
    route: { userIsAuth },

    location: { search },
    ...props
}: {
    route: { userIsAuth?: boolean };
    [key: string]: any;
}) => {
    // const articles: any[] = [];

    const currentUser: any = {
        role: USER_ROLES.SUPERADMIN,
        user_id: 1,
        user_name: 'test',
        user_email: 'test',
        user_avatar: {},
    };

    const dispatch = useDispatch();
    // const [arti, setState] = React.useState<any>();

    dispatch(
        getArticklesRequest(
            {},
            {
                onSuccess: (data: any) => {
                    // console.log('data', data);

                    return true;
                },
            },
        ),
    );

    const { articles } = useSelector(getArticklesSelector);

    // console.log('artickles', articles);

    const preparedArticles = (() => {
        const pinned = (articles || []).filter((i: any) => i?.meta?.isPinned); //TODO need move that to BE(sort by pinned)
        const non_pinned = (articles || []).filter(
            (i: any) => !i?.meta?.isPinned,
        );
        return [...pinned, ...non_pinned].filter(
            (i) =>
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
            </Box>
        </>
    );
};

export default Home;
