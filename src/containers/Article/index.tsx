import type { Metadata, ResolvingMetadata } from 'next';
import React from 'react';
import Link from 'next/link';

import classnames from 'classnames';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import {
    getArtickleByIdRequest,
    getArtickleSelector,
} from '@/modules/artickles';
import { getDataWrapper } from '@/modules/apiRoutes';
import { MetaData, MD } from '@/components';
import { LikeButton, Tag } from '@/components';
import Error from './components/Error';
import { Comments } from './components/Comments';

import style from './style.module.scss';

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    // read route params
    const id = params.id;

    // fetch data
    const product = await getDataWrapper(
        {
            requestAction: getArtickleByIdRequest,
            resultSelector: getArtickleSelector,
        },
        { id },
    );

    return {
        title: product.title,
        description: product.description,
        metadataBase: new URL('https://bel-geek.com'),
        alternates: {
            canonical: '/',
            languages: {
                'en-US': '/en-US',
                'be-Be': '/be-Be',
            },
        },
        openGraph: {
            title: product.title,
            description: product.description,
        },
        twitter: {
            title: product.title,
            description: (product.description || '').slice(0, 197) + '...',
        },
    };
}

const Article = async ({
    match: {
        params: { id },
    },
}: {
    match: { params: { id: string } };
}) => {
    const article = await getDataWrapper(
        {
            requestAction: getArtickleByIdRequest,
            resultSelector: getArtickleSelector,
        },
        { id },
    );

    const title = article?.meta?.title;

    return article ? (
        <>
            <div className="articlePage">
                <Link href="/">Галоўная</Link> <span>{'>'} </span>
                <span>{title}</span>
            </div>

            <div className={classnames(style.likeContainer)}>
                <LikeButton
                    likesCount={article?.likes || 0}
                    className={style.likeButton}
                    articleId={id}
                />
            </div>
            <main className="page__main main articlePage">
                <article className="episode box">
                    <h2 className="episode__title">{article?.meta?.title}</h2>
                    {(article?.meta?.tags.toString().split(',') || []).map(
                        (tag: string) => (
                            <Tag key={tag}>{tag}</Tag>
                        ),
                    )}
                    <div className="content">
                        <MD className={style.MD_view}>{article?.content}</MD>
                    </div>
                    <MetaData
                        showReadButton={false}
                        showLikes={false}
                        showTags={false}
                        meta={article?.meta}
                        articleId={id}
                    />
                    <Box marginTop={2}></Box>
                    <Grid marginTop={2} spacing={2} container>
                        <Grid item>
                            <Error artickleId={id} />
                        </Grid>
                        <Grid item xs={12}>
                            <Comments articleId={id}></Comments>
                        </Grid>
                    </Grid>
                </article>
            </main>
        </>
    ) : null;
};

export default Article;
