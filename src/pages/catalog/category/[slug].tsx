import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Title } from '@/styles/pages/Home';

interface IProduct {
  id: number;
  title: string;
}

interface Props {
  products: IProduct[];
  categoria: string;
}

export default function Category({ categoria, products }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Title>Categoria {categoria}</Title>
      <Link href="/">Voltar</Link>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const baseURL = `http://${process.env.HOST_IP}:3333`;
  const response = await fetch(`${baseURL}/categories`);
  const categories = await response.json();
  const paths = categories.map((category) => ({
    params: { slug: category.id },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { slug } = context.params;
  const baseURL = `http://${process.env.HOST_IP}:3333`;
  const response = await fetch(`${baseURL}/products?category_id=${slug}`);
  const products = await response.json();
  return {
    props: {
      products: products,
      categoria: slug as string,
    },
    revalidate: 60,
  };
};
