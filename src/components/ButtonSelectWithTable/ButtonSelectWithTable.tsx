import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";

// آیکون حذف آیتم
const RemoveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

type ButtonBaseProps = Omit<
  React.ComponentProps<typeof Button>,
  "onClick" | "onSelect" | "onChange"
>;

interface ButtonSelectWithTableProps extends ButtonBaseProps {
  columns: any[];
  data: any[];
  onSelect: (selectedItems: any[]) => void;
  modalTitle?: string;
  tableProps?: Omit<React.ComponentProps<typeof Table>, "columns" | "data">;
  name: string;
  label?: string;
  iconViewMode?: {
    remove?: React.ReactNode;
  };
}

const ButtonSelectWithTable: React.FC<ButtonSelectWithTableProps> = ({
  columns,
  data,
  onSelect,
  modalTitle = "انتخاب آیتم",
  tableProps = {},
  children,
  name,
  label,
  iconViewMode = { remove: <RemoveIcon /> },
  ...buttonProps
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formContext = useFormContext();

  if (!formContext) return null;

  const { setValue, watch } = formContext;
  const selectedItems = watch(name) || [];

  const handleSelectionChange = (newSelected: any[]) => {
    setValue(name, newSelected);
  };

  const handleRemoveItem = (itemId: number) => {
    const newSelected = selectedItems.filter(
      (item: { id: number }) => item.id !== itemId
    );
    setValue(name, newSelected);
  };

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}

      <Button
        {...buttonProps}
        onClick={() => setIsModalOpen(true)}
        variant="ghost"
        className="w-full justify-between bg-white !border-[1px] !border-gray-400"
      >
        {selectedItems.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedItems.map((item: { id: any; name: any }) => (
              <span key={item.id}>{item.name} , </span>
            ))}
          </div>
        ) : (
          "انتخاب کنید"
        )}
      </Button>

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedItems.map((item: { id: any; name: any }) => (
            <div
              key={item.id}
              className="bg-base-200 px-2 py-1 rounded-lg flex items-center gap-2"
            >
              <span>{item.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveItem(item.id);
                }}
                className="text-error"
              >
                {iconViewMode.remove}
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <div className="flex justify-between">
            {modalTitle}
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                انصراف
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>تایید</Button>
            </div>
          </div>
        }
        size="lg"
      >
        <Table
          columns={columns}
          data={data}
          selection="multiple"
          defaultSelected={selectedItems}
          onSelectionChange={handleSelectionChange}
          showIconViews={false}
          {...tableProps}
        />
      </Modal>

      {/* مقدار مخفی فرم */}
      <input
        type="hidden"
        name={name}
        value={JSON.stringify(
          selectedItems.map((item: { id: any }) => item.id)
        )}
      />
    </div>
  );
};

export default ButtonSelectWithTable;
