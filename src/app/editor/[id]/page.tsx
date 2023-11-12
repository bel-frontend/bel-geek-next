'use client';
import React from 'react';
import Editor from '@/containers/Editor';

const Article = ({ params: { id } }: any) => {
    return <Editor id={id} />;
};

export default Article;
