"use client";

import { FC } from "react";
import { useModal } from "@/hooks/use-modal-store";
import Modal from "../ui/modal";

interface CreateAreaManagerModalProps {}

const CreateAreaManagerModal: FC<CreateAreaManagerModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createAreaManager";

  console.log(isModalOpen);

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div>
        create areaManager
      </div>
    </Modal>
  );
};

export default CreateAreaManagerModal;
