import React, { CSSProperties, ChangeEvent } from 'react';
import style from './index.module.css'

interface CustomErrorProps {
  errorMessage: string;
}

const CustomError: React.FC<CustomErrorProps> = ({ errorMessage }) => {

  return (
    <div className={style.ErrorContainer}>
      {errorMessage}
    </div>
  );
};

export default CustomError;