import React from "react";
import Head from "next/head";

interface HeadProps {
  title: string;
}

const DefaultHead: React.FC<HeadProps> = ({ title = null }) => {
  const pagetitle = title ? `| ${title}` : "";

  return (
    <Head>
      <title>bUBi {pagetitle}</title>
      <meta name="author" content="Emmanuel Popoola" />
      <meta name="description" content="" />

      <meta property="og:image" content="" />
      <meta property="og:description" content="" />
      <meta property="og:title" content="" />
    </Head>
  );
};

export default DefaultHead;
