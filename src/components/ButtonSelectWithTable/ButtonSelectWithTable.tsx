import React, { useState } from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";

interface ButtonSelectWithTableProps extends Omit<React.ComponentProps<typeof Button>, 'onClick'> {
  columns: any[];
  data: any[];
  onSelect: (selectedItem: any) => void;
  modalTitle?: string;
}

const ButtonSelectWithTable: React.FC<ButtonSelectWithTableProps> = ({
  columns,
  data,
  onSelect,
  modalTitle = "Select Item",
  ...buttonProps
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        {...buttonProps}
        onClick={() => setIsModalOpen(true)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        size="lg"
      >
        <Table
          columns={columns}
          data={data}
          onRowClick={(row) => {
            onSelect(row);
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default ButtonSelectWithTable;