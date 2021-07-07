import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { Title } from '@/styles/pages/Home';
import { client } from '../lib/prismic';
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents'


interface Props {
  products: Document[];
}

export default function Home(props: Props) {
  const { products } = props;
  return (
    <div>
      <Title>Hello World</Title>
      <ul>
        <li>
          <Link href="/search">Search</Link>
        </li>
        <li>
          <Link href="/catalog/product/camiseta">Product [camiseta]</Link>
        </li>
        <li>
          <Link href="/catalog/category/camisetas">Categoria [camisetas]</Link>
        </li>
        <li>
          <Link href="top10">Top 10</Link>
        </li>
      </ul>

      <section>
        <Title>Products</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/catalog/product/${product.uid}`}>
                {PrismicDOM.RichText.asText(product.data.title)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  // const baseURL = `http://${process.env.HOST_IP}:3333`;
  // const response = await fetch(`${baseURL}/recommended`);
  // const products = await response.json();
  const { results:products } = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  console.dir({products: products.map(p => ({
    ...p.data
  }))}, { depth: null})

  return {
    props: {
      products
    },
  };
};
