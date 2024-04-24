import BookmarkReader from '@/components/bookmark/bookmark';
import fetchProducts from '../helpers/fetch-products';
import Header from '@/components/header';
import styles from './page.module.sass';
import Cover from '@/components/cover/cover';
import TopBanner from '@/components/banner/top-banner';

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
      { cache: 'no-store' }

      // {
      //   next: {
      //     revalidate: 300,
      //   },
      // }
    ),
    fetchProducts(
      `nutritionists?populate=*&filters[slug][$eq]=${props.params.slug}`,
      { cache: 'no-store' }

      // {
      //   next: {
      //     revalidate: 300,
      //   },
      // }
    ),
    fetchProducts(
      `categories?populate=[categories]&filters[nutritionists][slug][$eq]=${props.params.slug}&sort[0]=position:asc&pagination[pageSize]=30`,
      { cache: 'no-store' }
      // {
      //   next: {
      //     revalidate: 300,
      //   },
      // }
    ),
  ]);

  const productLinksData = productLinks.data || [];
  const nutricionistData = nutricionist.data || [];
  const categoriesData = categories.data || [];

  return (
    <>
      <div>
        <TopBanner
          cupomCode={nutricionistData[0]?.attributes.cupomcode}
          discount={nutricionistData[0]?.attributes.discount}
        />
        <Cover />
        <div className='container pb-60'>
          <Header
            nutritionistName={nutricionistData[0]?.attributes.Name}
            nutritionistImage={
              nutricionistData[0]?.attributes.profile_image?.data?.attributes
                ?.url
            }
            nutritionistDescription={
              nutricionistData[0]?.attributes.description
            }
          />
          {categoriesData.map((category, index) => {
            const productsInCategory = productLinksData.filter((product) =>
              product?.attributes?.categories?.data.some(
                (name) => name.attributes.name === category.attributes.name
              )
            );
            console.log(productsInCategory);
            if (productsInCategory.length > 0) {
              console.log(category.attributes.name);
              return (
                <div key={index}>
                  <h2 className={styles.category_header}>
                    {category.attributes.name}
                  </h2>
                  <div className='row'>
                    {productsInCategory.map((productLink, productIndex) => (
                      <BookmarkReader
                        key={productIndex}
                        url={`${productLink.attributes.url}`}
                        nutriSlug={nutricionistData[0]?.attributes.slug}
                      />
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
};

export default NuticionistList;
