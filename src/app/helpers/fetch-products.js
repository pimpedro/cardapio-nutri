import config from '@/config';

const fetchProducts = async (params) => {
  const reqOptions = {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  };
  const request = await fetch(`${config.api}/api/${params}`, reqOptions);
  const response = await request.json();

  return response;
};

export default fetchProducts;
