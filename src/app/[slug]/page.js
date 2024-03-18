import BookmarkReader from "@/components/bookmark/bookmark";
import fetchProducts from "../helpers/fetch-products";
import Header from "@/components/header";
import styles from './page.module.sass';
import Cover from "@/components/cover/cover";
import TopBanner from "@/components/banner/top-banner";

const NuticionistList = async (props) => {
  const productLinks = await fetchProducts(`product-links?pagination[pageSize]=500&populate=*&filters[nutritionists][slug][$eq]=${props.params.slug}&sort[1]=url:asc`)
  const nutricionist = await fetchProducts(`nutritionists?populate=*&filters[slug][$eq]=${props.params.slug}`)
  const categories = await fetchProducts(`categories?populate=*&sort[0]=position:asc&pagination[pageSize]=30`)
  


  return(
  <div >
    <TopBanner cupomCode={nutricionist.data[0].attributes.cupomcode}/>
    <Cover/>
    <div className="container pb-60">
    <Header nutritionistName={nutricionist.data[0].attributes.Name} 
    nutritionistImage={nutricionist.data[0].attributes.profile_image.data.attributes.url}
    ></Header>
    {
    categories.data.map((category,index)=>{

        const quantProduts = productLinks.data.filter(product => product && product.attributes && product.attributes.category && product.attributes.category.data&& product.attributes.category.data.attributes && product.attributes.category.data.attributes && product.attributes.category.data.attributes && product.attributes.category.data.attributes.name === `${category.attributes.name}`).length
        

        if(quantProduts > 0){
          return ( <div key={index}>
            <h2 className={styles.category_header} >{category.attributes.name}</h2>
                <div className="row">
                  {productLinks.data.filter(product => product && product.attributes && product.attributes.category && product.attributes.category.data&& product.attributes.category.data.attributes && product.attributes.category.data.attributes && product.attributes.category.data.attributes && product.attributes.category.data.attributes.name === `${category.attributes.name}`).map((productLink, index)=> 
                  {
                    return (
                        <BookmarkReader key={index} url={`${productLink.attributes.url} `} nutriSlug={nutricionist.data[0].attributes.slug} />
                      
                    )
                  }
                  )}
                  </div>
              </div>)



        }      

        }
      )}
      </div>
    </div>
  )
  };

  // export const generateStaticParams = async () => {
  // const nutritionistLinks = await fetchProducts(`nutritionists`)
    
  //   return nutritionistLinks.data.map((nutritionist) => ({
  //     slug:nutritionist.attributes.slug
  //   }
  //     // console.log(nutritionist.attributes.slug)
  //   ))
  // }

export default NuticionistList
