import Image from 'next/image';
import styles from './header.module.sass';

const Header = ({
  nutritionistName,
  cupomCode,
  nutritionistImage,
  nutritionistDescription,
}) => {
  console.log(nutritionistImage);
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
      {nutritionistImage !== undefined && (
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
      )}

      <div className={styles.contentWrap}>
        <div>
          <h1 className={styles.contentTitle}>
            {nutritionistName} e Trela <br /> Seleção de produtos favoritos
          </h1>
          <p>{nutritionistDescription}</p>
          {/* <p><strong>Ganhe 20% OFF </strong> na primeira compra usando meu cupom: <strong>{cupomCode}</strong>.</p> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
