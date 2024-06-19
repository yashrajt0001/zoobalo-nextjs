"use client";

import { FC } from "react";
import { Dialog, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { DialogContent } from "@radix-ui/react-dialog";

interface CreateAreaManagerModalProps {}

const CreateAreaManagerModal: FC<CreateAreaManagerModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createAreaManager";

  console.log(isModalOpen);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>name</DialogTitle>
        <DialogDescription>yashraj</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAreaManagerModal;
