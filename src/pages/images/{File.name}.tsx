import React from "react";
import { graphql } from "gatsby";
import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as credits from "../../images/__credits.json";

// styles
const pageStyles = {
  color: "#232129",
  padding: 48,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
};

interface Props {
  data: {
    file: FileNode & { name: keyof typeof credits };
  };
}

const ImagePage = ({ data }: Props) => {
  const image = getImage(data.file);
  if (!image) {
    return <p>404</p>;
  }
  const credit = credits[data.file.name];
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>Image by {credit.user_name}</h1>
      <GatsbyImage image={image} alt="" />
      <p>
        <a href={credit.photo_url}>Photo</a> by{" "}
        <a href={credit.user_url}>{credit.user_name}</a>
      </p>
    </main>
  );
};
export default ImagePage;
// This is the page query that connects the data to the actual component. Here you can query for any and all fields
// you need access to within your code. Again, since Gatsby always queries for `id` in the collection, you can use that
// to connect to this GraphQL query.
export const query = graphql`
  query ($id: String) {
    file(id: { eq: $id }) {
      id
      name
      childImageSharp {
        gatsbyImageData(width: 800)
      }
    }
  }
`;
