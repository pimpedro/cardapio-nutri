'use client'
import { useEffect, useState } from 'react';
import styles from './bookmark.module.sass';
import Link from 'next/link'
import Image from 'next/image';

function BookmarkReader({url, nutriSlug}) {
  const [openGraphData, setOpenGraphData] = useState(null);

    const urlprops = url

  useEffect(() => {
    const fetchOpenGraphData = async () => {
      try {
        const url = `${urlprops}`; // Replace with your URL
        const response = await fetch(`/api/opengraph?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        setOpenGraphData(data);
      } catch (error) {
        console.error('Error fetching OpenGraph data:', error);
      }
    };

    fetchOpenGraphData();
  }, []);

  
  return (
    <div className={`${styles.bookmarkWrap} col_2`}>
      <div className={`${styles.bookmark}`}>
      {openGraphData && (
        <Link href={`${urlprops.trim()}?utm_medium=referral&utm_source=pagnutri&utm_campaign=nutris&utm_content=${nutriSlug.trim()}`} 
        rel="noopener noreferrer" target="_blank">
          <div className={`${styles.bookmark_imageWrap}`}>
            <div className={styles.bookmark_image}>
              {openGraphData.image ? <Image src={openGraphData.image} alt={openGraphData.title} fill={true}/> : <p>imagem</p>}
            </div>
          </div>
          <div className={styles.bookmark_content}>
            <h3>{openGraphData.title}</h3>
          </div>
          
        </Link>
        
      )}
      </div>
      </div>
  );
}

export default BookmarkReader;