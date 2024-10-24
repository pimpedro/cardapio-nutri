import BookmarkReader from '@/components/bookmark/bookmark';
import fetchProducts from '../helpers/fetch-products';
import Header from '@/components/header';
import styles from './page.module.sass';
import Cover from '@/components/cover/cover';
import TopBanner from '@/components/banner/top-banner';
import ClientNutricionistList from './ClientNutricionistList';

export function generateMetadata({ params }) {
  return {
    title: `${params.slug
      .split('-')
      .map((e) => e[0].toUpperCase() + e.substring(1))
      .join(' ')} & Trela`,
  };
}

const NuticionistList = async (props) => {
  const [productLinks, nutricionist, categories] = await Promise.all([
    fetchProducts(
      `product-links?pagination[pageSize]=800&populate=*&filters[nutritionists][slug][$eq]=${props.params.slug}&sort[1]=url:asc`,
      {
        next: {
          revalidate: 300,
        },
      }
    ),
    fetchProducts(
      `nutritionists?populate=*&filters[slug][$eq]=${props.params.slug}`,
      {
        next: {
          revalidate: 300,
        },
      }
    ),
    fetchProducts(
      `categories?populate=[categories]&filters[nutritionists][slug][$eq]=${props.params.slug}&sort[0]=position:asc&pagination[pageSize]=30`,
      {
        next: {
          revalidate: 300,
        },
      }
    ),
  ]);

  const productLinksData = productLinks.data || [];
  const nutricionistData = nutricionist.data || [];
  const categoriesData = categories.data || [];

  return (
    <ClientNutricionistList
      productLinksData={productLinksData}
      nutricionistData={nutricionistData}
      categoriesData={categoriesData}
    />
  );
};

export default NuticionistList;
