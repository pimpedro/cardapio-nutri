import Image from "next/image"
import styles from './cover.module.sass';

function Cover() {
  return (
    <div className={styles.coverWrap}>
        <div className={styles.cover_image}>
        <Image
            src="/cover_trela.png"
            fill={true}
            alt="Produtos da Trela"
        />
        </div>
    </div>
  )
}

export default Cover