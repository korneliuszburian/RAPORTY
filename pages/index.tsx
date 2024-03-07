import React from "react";
import Intro from "../components/intro";
import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import Layout from "../components/layout";
import { Tekken7Model } from "../components/tekken-model";

export default function Index({ allReports: { edges }, preview }) {
  const heroReport = edges[0]?.node;
  const moreReports = edges.slice(1);

  const constructReportUrl = (folderName) =>
    `/reports/${folderName}/.unlighthouse/index.html`;

  return (
    <Layout preview={preview}>
      <Head>
        <title>R@PORTY</title>
      </Head>
      <Container>
        <Intro />
        {heroReport && (
          <div className="my-8">
            <h1 className="text-2xl font-bold mb-2">
              {heroReport.reportFields.report_name}
            </h1>
            <h3 className="text-lg mb-4">
              {heroReport.reportFields.folder_name}
            </h3>
            <p className="mb-6">
              url: {constructReportUrl(heroReport.reportFields.folder_name)}
            </p>
            <a
              href={constructReportUrl(heroReport.reportFields.folder_name)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150"
            >
              Open in new tab
            </a>
            <iframe
              src={constructReportUrl(heroReport.reportFields.folder_name)}
              className="w-full h-screen mt-4"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        )}
        {moreReports.length > 0 && (
          <div className="space-y-8">
            {moreReports.map(({ node }) => (
              <div key={node.id} className="border-t pt-8">
                <h2 className="text-xl font-semibold">{node.title}</h2>
                <h3 className="text-lg">{node.reportFields.folder_name}</h3>
                <p className="mb-4">
                  URL: {constructReportUrl(node.reportFields.folder_name)}
                </p>
                <a
                  href={constructReportUrl(node.reportFields.folder_name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150"
                >
                  Open in new tab
                </a>
                <iframe
                  src={constructReportUrl(node.reportFields.folder_name)}
                  className="w-full h-screen mt-4"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            ))}
          </div>
        )}
        <Tekken7Model />
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  return {
    props: {
      allReports: {
        edges: [
          {
            node: {
              id: 1,
              title: "Example Report 1",
              reportFields: {
                report_name: "Bodymove - raport",
                folder_name: "bodymove-report",
              },
            },
          },
          {
            node: {
              id: 2,
              title: "Example Report 2",
              reportFields: {
                report_name: "MCP - raport",
                folder_name: "mcp-report",
              },
            },
          },
        ],
      },
      preview,
    },
    revalidate: 10,
  };
};
