"use client";

import { useState } from 'react';
import BookmarkReader from '@/components/bookmark/bookmark';
import Header from '@/components/header';
import styles from './page.module.sass';
import Cover from '@/components/cover/cover';
import TopBanner from '@/components/banner/top-banner';

// List of tags with their IDs and names
const tags = [
  { name: 'Low Carb', id: 1 },
  { name: 'Vegano', id: 2 },
  { name: 'Vegetariano', id: 3 },
  { name: 'Orgânico', id: 4 },
  { name: 'Sem Lactose', id: 5 },
  { name: 'Sem Glúten', id: 6 },
  { name: 'Sem Adição de açúcar', id: 7 },
];

const ClientNutricionistList = ({ productLinksData, nutricionistData, categoriesData }) => {
  // State for selected tag
  const [selectedTag, setSelectedTag] = useState(null);

  // Filter products based on selected tag ID if selected
  const filteredProducts = selectedTag
    ? productLinksData.filter((product) =>
        product?.attributes?.tags?.data.some(
          (tag) => tag.id === selectedTag
        )
      )
    : productLinksData;

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
          {/* Render tag selection buttons */}
          <div className={styles.tagButtons}>
            {tags.map((tag) => (
              <button key={tag.id} onClick={() => setSelectedTag(tag.id)}>
                {tag.name}
              </button>
            ))}
            <button onClick={() => setSelectedTag(null)}>Show All</button>
          </div>

          {categoriesData.map((category, index) => {
            const productsInCategory = filteredProducts.filter((product) =>
              product?.attributes?.categories?.data.some(
                (name) => name.attributes.name === category.attributes.name
              )
            );
            if (productsInCategory.length > 0) {
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

export default ClientNutricionistList;
