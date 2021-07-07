import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Title } from '@/styles/pages/Home';

import dynamic from 'next/dynamic';
import SEO from '../components/SEO';

const Modal = dynamic(() => import('@/lib/Modal'), {
  loading: () => <p>Carregando...</p>,
  ssr: false,
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  h1 {
    margin: 20px 0;
  }
  input,
  button {
    width: 150px;
    padding: 8px;
    border-radius: 4px;
  }
  input,
  input::placeholder {
    text-align: center;
  }
`;

export default function () {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const inputsRef = [useRef<HTMLInputElement>(), useRef<HTMLInputElement>()];
  const modalRef = useRef();
  async function sumNumbers() {
    const math = await import('@/lib/math');
    const [n1, n2] = inputsRef.map((ref) => Number(ref.current.value));
    const total = math.sum(n1, n2);
    alert(total);
  }
  function handleChange(event) {
    event.target.value = event.target.value.replace(/\D/, '');
  }
  function handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    if (!inputsRef[0].current.value) inputsRef[0].current.focus();
    else if (!inputsRef[1].current.value) inputsRef[1].current.focus();
    else {
      const button = inputsRef[1].current
        .nextElementSibling as HTMLButtonElement;
      button.focus();
      button.click();
    }
  }
  function openModal() {
    setModalIsOpen(true);
  }
  useEffect(() => {
    console.log(process.env.API_URL);
    console.log(process.env.NEXT_PUBLIC_ENV_VAR);
    console.log(process.env.NEXT_PUBLIC_ENV_VAR2);
  }, []);
  return (
    <Wrapper>
      <SEO title="Dynamic Import" shouldExcludeTitleSufix />
      <Title>Calculo com import dinâmico</Title>
      <input
        type="text"
        placeholder="Número 1"
        ref={inputsRef[0]}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <input
        type="text"
        placeholder="Número 2"
        ref={inputsRef[1]}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={sumNumbers}>Somar</button>

      <Title>Import dinamico de componente</Title>
      <button onClick={openModal}>Open Modal</button>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          ref={modalRef}
          onClose={() => setModalIsOpen(false)}
        />
      )}
    </Wrapper>
  );
}
