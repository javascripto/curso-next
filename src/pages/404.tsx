import { useEffect } from 'react';
import { Title } from '@/styles/pages/Home';

export default function NotFound() {
  useEffect(() => {
    setTimeout(() => {
      location.pathname = '/';
    }, 5000);
  }, []);
  return (
    <div>
      <Title>Page not found</Title>
      <p>Are you lost?</p>
    </div>
  );
}
