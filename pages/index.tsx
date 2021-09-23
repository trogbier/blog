import type {GetStaticProps} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import client from "../contentful";

const Home = ({home}: { home: any }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>{home.fields.Title}</title>
            </Head>

            <main>
                <h1>{home.fields.Title}</h1>
            </main>
        </div>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    const home = await client.getEntries({
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
