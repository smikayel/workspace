import React, { CSSProperties, ChangeEvent } from 'react';
import style from './index.module.css'

interface CustomButtonProps {
  text: string;
  onChange: (value: string) => void;
  customStyles?: CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onChange, customStyles }) => {
  const handleButtonChange = (event: ChangeEvent<HTMLButtonElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className={style.ButtonContainer}>
      <button className={style.CustomButton}
        onChange={handleButtonChange}
        style={customStyles}
      >
        <div className={style.ButtonName}>{ text }</div>
      </button>
    </div>
  );
};

export default CustomButton;