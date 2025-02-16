import React from "react";

interface DropdownItem {
  label: React.ReactNode;
  value: string;
  onClick?: () => void;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: "left" | "right" | "top" | "bottom";
  size?: "xs" | "sm" | "md" | "lg";
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  position = "bottom",
  size = "md",
}) => {
  return (
    <div className={`dropdown dropdown-${position}`}>
      <label tabIndex={0} className="cursor-pointer">
        {trigger}
      </label>
      <ul
        tabIndex={0}
        className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ${
          size ? `menu-${size}` : ""
        }`}
      >
        {items.map((item, index) => (
          <li key={index}>
            <a onClick={item.onClick}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;