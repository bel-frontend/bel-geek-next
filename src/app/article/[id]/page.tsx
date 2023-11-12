import React from 'react';
import ArticleContainer from '@/containers/Article';

export { generateMetadata } from '@/containers/Article';

const Article = ({
    params,
    searchParams,
    ...props
}: {
    params: { id: string };
    searchParams: any;
}) => {
    console.log(props);

    return (
        <ArticleContainer
            match={{
                params: {
                    id: params.id,
                },
            }}
        />
    );
};

export default Article;
