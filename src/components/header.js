import Image from 'next/image';
import styles from './header.module.sass';

const Header = ({ nutritionistName, cupomCode, nutritionistImage }) => {
  return (
    <header>
      <div className={styles.profileImageWrap}>
        <div className={styles.profileImage_image}>
          <Image
            src={nutritionistImage}
            fill={true}
            alt='Foto de perfil'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      </div>
      <div className={styles.profileImageWrap}>
        <div className={styles.profileImage_image}>
          <Image
            src={nutritionistImage}
            fill={true}
            alt='Foto de perfil'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      </div>
      <div className={styles.contentWrap}>
        <div>
          <h1 className={styles.contentTitle}>
            {nutritionistName} e Trela <br /> Seleção de produtos favoritos
          </h1>
          <p>
            Quer encontrar produtos das melhores marcas em um só lugar? A Trela
            te ajuda a comprar alimentos de qualidade para ter uma vida mais
            equilibrada e comer bem em todas as suas refeições. Eles ainda
            garantem os melhores preços do mercado e a entrega é sempre grátis.
          </p>
          {/* <p><strong>Ganhe 20% OFF </strong> na primeira compra usando meu cupom: <strong>{cupomCode}</strong>.</p> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
