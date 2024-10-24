import styles from './top-banner.module.sass';

function TopBanner({ cupomCode, discount }) {
  console.log("top-banner",cupomCode,discount);
  return (
    <div className={styles.bannerWrap}>
      <span className={styles.bannerContent}>
        {' '}
        {discount !== null ? discount : '20%'} na primeira compra usando meu
        cupom: {cupomCode}{' '}
      </span>
    </div>
  );
}

export default TopBanner;
