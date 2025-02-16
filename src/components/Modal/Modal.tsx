import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}) => {
  if (!isOpen) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  }[size];

  return (
    <div className="modal modal-open">
      <div className={`modal-box ${sizeClass}`}>
        {title && (
          <h3 className="font-bold text-lg mb-4">{title}</h3>
        )}
        <div className="modal-content">
          {children}
        </div>
        {footer && (
          <div className="modal-action mt-6">
            {footer}
          </div>
        )}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default Modal;