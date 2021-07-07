import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Title } from '@/styles/pages/Home';

interface Props {
  products: IProduct[];
  date: string;
}

interface IProduct {
  id: number;
  title: string;
}

export default function Top10({ products, date }: Props) {
  return (
    <div>
      <Title>Top 10</Title>
      <Link href="/">Voltar</Link>
      <p>{date}</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const baseURL = `http://${process.env.HOST_IP}:3333`;
  const response = await fetch(`${baseURL}/products`);
  const products = await response.json();
  return {
    props: {
      products,
      date: new Date().toJSON().slice(11, -1),
    },
    revalidate: 5, // 5 seconds
  };
};
