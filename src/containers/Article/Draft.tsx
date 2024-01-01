'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { ArticleInterface } from '@/constants/types/article';
import { EditLink } from '@/components';
import {
    getArtickleByIdRequest,
    getArtickleSelector,
} from '@/modules/artickles';
import ArticleView from './components/Article';

const Draft = ({
    match: {
        params: { id },
    },
}: {
    match: { params: { id: string } };
}) => {
    const dispatch = useDispatch();
    const article: ArticleInterface = useSelector(getArtickleSelector);

    React.useEffect(() => {
        dispatch(getArtickleByIdRequest({ id }));
    }, []);

    return article ? (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'relative',
                    top: '20px',
                }}
            >
                <EditLink id={id} meta={article?.meta} />
            </Box>
            <ArticleView article={article} />
        </>
    ) : null;
};

export default Draft;
