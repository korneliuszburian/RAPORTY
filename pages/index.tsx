import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import Layout from "../components/layout";
import Intro from "../components/intro";
import DynamicIframe from "../components/dynamic-iframe";
import { Tekken7Model } from "../components/tekken-model";

const constructReportUrl = (folderName) =>
  `/reports/${folderName}/.unlighthouse/index.html`;

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
            <h1>report title: {heroReport.reportFields.report_name}</h1>
            <h3>report folder's name: {heroReport.reportFields.folder_name}</h3>
            <p>
              url: {constructReportUrl(heroReport.reportFields.folder_name)}
            </p>
            <DynamicIframe
              src={constructReportUrl(heroReport.reportFields.folder_name)}
            />
          </div>
        )}
        {moreReports.length > 0 && (
          <div>
            {moreReports.map(({ node }) => (
              <div key={node.id}>
                <h2>{node.title}</h2>
                <h3>Folder: {node.reportFields.folder_name}</h3>
                <p>URL: {constructReportUrl(node.reportFields.folder_name)}</p>
                <DynamicIframe
                  src={constructReportUrl(node.reportFields.folder_name)}
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
export const getStaticProps = async ({ preview = false }) => ({
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
});
