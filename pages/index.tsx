import Intro from "../components/intro";
import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import Layout from "../components/layout";
import { Tekken7Model } from "../components/tekken-model";
import { getAllReportsForHome } from "../lib/api";

export default function Index({ allReports: { edges }, preview }) {
  const heroReport = edges[0]?.node;
  const moreReports = edges.slice(1);

  return (
    <Layout preview={preview}>
      <Head>
        <title>R@PORTY</title>
      </Head>
      <Container>
        <Intro />
        {heroReport && (
          <div>
            <h1>{heroReport.title}</h1>
            {/* Additional hero report details can be rendered here */}
          </div>
        )}
        {moreReports.length > 0 && (
          <div>
            {moreReports.map(({ node }) => (
              <div key={node.id}>
                <h2>{node.title}</h2>
                {/* Additional details for more reports can be rendered here */}
              </div>
            ))}
          </div>
        )}
        {/* Additionally, display the Tekken7Model */}
        <Tekken7Model />
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allReports = await getAllReportsForHome(); // Updated function call

  return {
    props: { allReports, preview },
    revalidate: 10,
  };
};
