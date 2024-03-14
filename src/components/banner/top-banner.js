import styles from './top-banner.module.sass';

function TopBanner({cupomCode}) {
  return (
    <div className={styles.bannerWrap}>
        <span className={styles.bannerContent}>  20% OFF  na primeira compra usando meu cupom: {cupomCode} </span>
    </div>
  )
}

export default TopBanner