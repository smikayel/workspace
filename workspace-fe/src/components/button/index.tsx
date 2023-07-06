import React, { CSSProperties, ChangeEvent } from 'react';
import style from './index.module.css'

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  customStyles?: CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, customStyles }) => {

  return (
    <div className={style.ButtonContainer}>
      <button className={style.CustomButton}
        onClick={() => onClick()}
        style={customStyles}
      >
        <div className={style.ButtonName}>{ text }</div>
      </button>
    </div>
  );
};

export default CustomButton;