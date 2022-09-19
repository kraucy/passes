import clsx from 'clsx';
import React from 'react';
import { HeartIcon } from '../assets/HeartIcon';

export const HeartButton = ({ fillColor, isClicked, onClick }) =>
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
      <HeartIcon alt="heart icon" className={ clsx("heart", {
        "is_animating": isClicked
      })
      }
        fillColor={ fillColor }
      />
    </button>
  );
};