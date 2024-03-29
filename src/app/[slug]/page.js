import BookmarkReader from "@/components/bookmark/bookmark";
import fetchProducts from "../helpers/fetch-products";
import Header from "@/components/header";
import styles from './page.module.sass';
import Cover from "@/components/cover/cover";
import TopBanner from "@/components/banner/top-banner";

const NuticionistList = async (props) => {
  const [productLinks, nutricionist, categories] = await Promise.all([
    fetchProducts(`product-links?pagination[pageSize]=500&populate=*&filters[nutritionists][slug][$eq]=${props.params.slug}&sort[1]=url:asc`),
    fetchProducts(`nutritionists?populate=*&filters[slug][$eq]=${props.params.slug}`),
    fetchProducts(`categories?populate=*&sort[0]=position:asc&pagination[pageSize]=30`)
  ]);

  const productLinksData = productLinks.data || [];
  const nutricionistData = nutricionist.data || [];
  const categoriesData = categories.data || [];

  return (
    <div>
      <TopBanner cupomCode={nutricionistData[0]?.attributes.cupomcode}/>
      <Cover/>
      <div className="container pb-60">
        <Header
          nutritionistName={nutricionistData[0]?.attributes.Name}
          nutritionistImage={nutricionistData[0]?.attributes.profile_image?.data?.attributes?.url}
        />
        {categoriesData.map((category, index) => {
          const productsInCategory = productLinksData.filter(product =>
            product?.attributes?.category?.data?.attributes?.name === category.attributes.name
          );
          if (productsInCategory.length > 0) {
            return (
              <div key={index}>
                <h2 className={styles.category_header}>{category.attributes.name}</h2>
                <div className="row">
                  {productsInCategory.map((productLink, productIndex) => (
                    <BookmarkReader key={productIndex} url={`${productLink.attributes.url}`} nutriSlug={nutricionistData[0]?.attributes.slug} />
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default NuticionistList;