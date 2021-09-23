import React from 'react';
import {IArticle, IArticleFields} from "../../@types/generated/contentful";
import {Container} from "reactstrap";
import Head from "next/head";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {GetStaticPaths, GetStaticProps} from "next";
import client from "../../contentful";


export default function Article({article}: { article: IArticle }) {
    return (
        <>
            <Head>
                <title>
                    {article.fields.title}
                </title>
            </Head>
            <Container>
                <h1 className={'py-3'}>
                    {article.fields.title}
                </h1>
                <div className={'py-2'}>
                    {documentToReactComponents(article.fields.content!)}
                </div>
            </Container>
        </>
    );
};
export const getStaticPaths: GetStaticPaths = async () => {
    const articleEntries = await client.getEntries<IArticleFields>({
        content_type: 'article',
        select: 'fields.slug'
    })
    return {
        paths: articleEntries.items.map(item => {
            return {
                params: {
                    article: item.fields.slug
                }
            }
        }),
        fallback: false
    }
}
export const getStaticProps: GetStaticProps = async ({params}) => {
    const slug = params!.article

    const articleEntries = await client.getEntries<IArticleFields>({
        content_type: 'article',
        limit: 1,
        'fields.slug': slug
    })
    const [article] = articleEntries.items

    return {
        props: {
            article
        }
    }
}
