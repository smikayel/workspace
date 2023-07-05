import React, { ChangeEvent } from 'react';
import style from './index.module.css'

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  onChange: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, value, type, onChange }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className={style.InputContainer}>
      <input className={style.CustomInput}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default CustomInput;