import { createClient } from "../prismicio";
import { BannerHome } from "../components/organism/BannerHome";
import styles from "./pages.module.scss"

const Index = () => {
  return (
    <div id='body'>
      <BannerHome />
      <p>hello!</p>
    </div>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const articles = await client.getAllByType("article", {
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      articles,
      navigation,
      settings,
    },
  };
}
