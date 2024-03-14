import BookmarkReader from "@/components/bookmark/bookmark";
import fetchProducts from "../helpers/fetch-products";
import Header from "@/components/header";
import styles from './page.module.sass';
import Cover from "@/components/cover/cover";
import TopBanner from "@/components/banner/top-banner";

const NuticionistList = async (props) => {
  const productLinks = await fetchProducts(`product-links?populate=*&filters[nutritionists][slug][$eq]=${props.params.slug}&pagination[pageSize]=300`)
  const nutricionist = await fetchProducts(`nutritionists?populate=*&filters[slug][$eq]=${props.params.slug}`)
  const categories = await fetchProducts(`categories?populate=*&pagination[pageSize]=300`)
  // console.log(nutricionist.data[0].attributes.profile_image.data.attributes.url)

  return(
  <div>
    <TopBanner cupomCode={nutricionist.data[0].attributes.cupomcode}/>
    <Cover/>
    <div className="container">
    <Header nutritionistName={nutricionist.data[0].attributes.Name} 
    nutritionistImage={nutricionist.data[0].attributes.profile_image.data.attributes.url}
    ></Header>
    {
    categories.data.map((category,index)=>
      <div key={index}>
      <h2 className={styles.category_header} >{category.attributes.name}</h2>
      <div className="row">
        {productLinks.data.filter(product => product && product.attributes && product.attributes.category && product.attributes.category.data&& product.attributes.category.data.attributes && product.attributes.category.data.attributes && product.attributes.category.data.attributes && product.attributes.category.data.attributes.name === `${category.attributes.name}`).map((productLink, index)=> 
        {
          return (
              <BookmarkReader key={index} url={`${productLink.attributes.url}`} />
            
            
            
          )
        }
        )}
        </div>
        </div>
      )}
      </div>
    </div>
  )
  };

  export const generateStaticParams = async () => {
  const nutritionistLinks = await fetchProducts(`nutritionists`)
    
    return nutritionistLinks.data.map((nutritionist) => ({
      slug:nutritionist.attributes.slug
    }
      // console.log(nutritionist.attributes.slug)
    ))
  }

export default NuticionistList
