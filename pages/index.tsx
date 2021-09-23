import type {GetStaticProps} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import client from "../contentful";
import {IArticle, IArticleFields, IMain, IMainFields} from "../@types/generated/contentful";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {Button, Card, CardText, CardTitle, Col, Container, Row} from "reactstrap";

const Home = ({home, article}: { home: IMain, article: IArticle[] }) => {
    return (
        <div>
            <Head>
                <title>{home.fields.Title}</title>
            </Head>

            <main>
                <div
                    className={'text-center p-5 text-white'}
                    style={{
                        background: `url('http:${home.fields.Background?.fields.file.url}') no-repeat center / cover`,
                        minHeight: 300
                    }}>
                    <h1 className={'mt-5'}>{home.fields.Title}</h1>
                    <div className={'m-4'}>
                        {documentToReactComponents(home.fields.Description!)}
                    </div>
                </div>
            </main>

            <Container className={'pt-5'}>
                <Row>
                    {article.map(article => {
                        return (
                            <Col sm={4} key={article.fields.slug} >
                                <Card style={{height:180}}>
                                    <CardTitle tag='h5'>
                                        {article.fields.title}
                                    </CardTitle>
                                    <CardText style={{height:'100%'}}>
                                        {article.fields.description}
                                    </CardText>

                                    <Link href={`/articles/${article.fields.slug}`}>
                                    <Button>
                                        Читать
                                    </Button>
                                    </Link>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    const home = await client.getEntries<IMainFields>({
        content_type: 'main',
        limit: 1
    })
    const article = await client.getEntries<IArticleFields>({
        content_type: 'article',
        select: 'fields.title,fields.slug,fields.description'
    })

    const [homePage] = home.items
    const articlePage = article.items

    return {
        props: {
            home: homePage,
            article: articlePage
        }
    }
}
