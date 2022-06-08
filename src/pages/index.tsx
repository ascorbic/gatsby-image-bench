import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as React from "react";

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};
const headingAccentStyles = {
  color: "#663399",
};

const masonry = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridTemplateRows: "masonry",
  gap: 10,
};

const IndexPage = ({ data }: any) => {
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1 style={headingStyles}>
        Congratulations
        <br />
        <span style={headingAccentStyles}>— you just made a Gatsby site! </span>
        🎉🎉🎉
      </h1>
      <div style={masonry}>
        {data.allFile.nodes.map((file: any) => {
          const image = getImage(file);
          if (!image) {
            return null;
          }
          return (
            <Link to={file.gatsbyPath}>
              <GatsbyImage image={image} alt={file.name} />
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allFile {
      nodes {
        gatsbyPath(filePath: "/images/{File.name}")
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 250)
        }
      }
    }
  }
`;
