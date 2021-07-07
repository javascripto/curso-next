import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Product(props) {
  const router = useRouter();
  return (
    <div>
      <h1>Produto [slug] {router.query.slug}</h1>
      <Link href="/">Voltar</Link>
      {/* <pre>{JSON.stringify(router, null, 2)}</pre> */}
      
    </div>
  );
}
