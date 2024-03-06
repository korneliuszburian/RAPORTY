import Intro from "../components/intro";
import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import Layout from "../components/layout";
import { getAllReportsForHome } from "../lib/api"; // Updated import

export default function Index({ allReports: { edges }, preview }) {
  const heroReport = edges[0]?.node; // Renamed from heroPost to heroReport
  const moreReports = edges.slice(1); // Renamed from morePosts to moreReports

  return (
    <Layout preview={preview}>
      <Head>
        <title>R@PORTY</title>
      </Head>
      <Container>
        <Intro />
        {heroReport && (
          // Update this component as needed to display report data
          <div>
            <h1>{heroReport.title}</h1>
            {/* Render additional report details here */}
          </div>
        )}
        {moreReports.length > 0 && (
          // Update this component as needed to display multiple reports
          <div>
            {moreReports.map(({ node }) => (
              <div key={node.id}>
                <h2>{node.title}</h2>
                {/* Render additional report details here */}
              </div>
            ))}
          </div>
        )}
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
