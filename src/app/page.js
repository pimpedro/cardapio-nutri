import Link from 'next/link';
import fetchProducts from './helpers/fetch-products';

const Home = async () => {
  const nutricionist = await fetchProducts(
    'nutritionists?filters[active][$eq]=true',
    { cache: 'no-store' }
    // {
    //   next: {
    //     revalidate: 300,
    //   },
    // }
  );
  return (
    <div className='container'>
      <ul>
        {nutricionist.data.map((nutricionist, id) => (
          <li key={id}>
            {' '}
            <Link href={`/${nutricionist.attributes.slug}`}>
              {' '}
              {nutricionist.attributes.Name}{' '}
            </Link>{' '}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
