'use client'
import { useEffect, useState } from 'react';
import styles from './bookmark.module.sass';
import Link from 'next/link';
import Image from 'next/image';

function BookmarkReader({ url, nutriSlug }) {
  const [openGraphData, setOpenGraphData] = useState(null);

  useEffect(() => {
    const fetchOpenGraphData = async () => {
      try {
        const response = await fetch(`/api/opengraph?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch OpenGraph data');
        }
        const data = await response.json();
        setOpenGraphData(data);
      } catch (error) {
        console.error('Error fetching OpenGraph data:', error);
      }
    };

    fetchOpenGraphData();
  }, [url]);

  if (!openGraphData || !openGraphData.title || openGraphData.title === "undefined | Trela") {
    return null; // Render nothing if data is not available or has invalid title
  }

  return (
    <div className={`${styles.bookmarkWrap} col_2`}>
      <div className={styles.bookmark}>
        <Link
          href={`${url.trim()}?utm_medium=referral&utm_source=pagnutri&utm_campaign=nutris&utm_content=${nutriSlug.trim()}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className={styles.bookmark_imageWrap}>
            <div className={styles.bookmark_image}>
              <Image src={openGraphData.image} alt={openGraphData.title} fill={true} />
            </div>
          </div>
          <div className={styles.bookmark_content}>
            <h3>{openGraphData.title}</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default BookmarkReader;