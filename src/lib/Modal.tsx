import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

function Modal({ isOpen: isOpenProp, onClose }, ref) {
  const [isOpen, setIsOpen] = useState(!!isOpenProp);
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));
  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);
  return (
    <dialog
      open={isOpen}
      style={{
        top: '50%',
        left: '50%',
        padding: '40px',
        position: 'fixed',
        border: '4px solid red',
        transform: 'translate(-50%, -50%)',
      }}
    >
      Olá, sou um modal
      <button
        style={{
          width: '20px',
          height: '20px',
          position: 'relative',
          top: -40,
          right: -40,
          padding: 0,
        }}
        onClick={() => {
          setIsOpen(false);
          onClose?.();
        }}
      >
        x
      </button>
    </dialog>
  );
}

export default forwardRef(Modal);
