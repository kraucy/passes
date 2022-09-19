import React from 'react';
import { HeartIcon } from '../assets/HeartIcon';

export const HeartButton = ({ fillColor, onClick }) =>
{
  return (
    <button onClick={ onClick } style={ {
      background: 'none',
      color: 'inherit',
      border: 'none',
      padding: 0,
      font: 'inherit',
      cursor: 'pointer',
      outline: 'inherit',
    } }>
      <HeartIcon alt="heart icon" fillColor={
        fillColor
      }
      />
    </button>
  );
};