import type {GetStaticProps} from 'next'
import Head from 'next/head'
import client from "../contentful";
import {IMain, IMainFields} from "../@types/generated/contentful";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

const Home = ({home}: { home: IMain }) => {
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
                        minHeight: 350
                    }}>
                    <h1 className={'mt-5'}>{home.fields.Title}</h1>
                    <div className={'mb-5'}>
                        {documentToReactComponents(home.fields.Description!)}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    const home = await client.getEntries<IMainFields>({
        content_type: 'main',
        limit: 1
    })

    const [homePage] = home.items

    return {
        props: {
            home: homePage
        }
    }
}
