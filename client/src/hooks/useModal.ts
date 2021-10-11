import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);

  return { isOpen, handleOpenModal, handleCloseModal };
};
