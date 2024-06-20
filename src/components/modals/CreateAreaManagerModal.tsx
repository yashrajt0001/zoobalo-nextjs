"use client";

import { FC } from "react";
import { Dialog, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { DialogContent } from "@radix-ui/react-dialog";
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
