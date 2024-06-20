import { X } from "lucide-react";

interface ModalProps {
    open: boolean
    onClose: () => void
    children: React.ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed z-10 inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white z-20 rounded-xl shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}
