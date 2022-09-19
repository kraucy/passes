import React from 'react';

export const Likes = ({ numOfLikes }) =>
{
  const formatNumOfLikes = ({ likes }) =>
  {
    const formattedLikes = likes;
    if (formattedLikes > 999)
    {
      const likesToString = likes.toLocaleString('en-US');
      const newString = likesToString.split(',').join('.').substring(0, likesToString.length - 2);
      return `${ newString }K`;
    } else
    {
      return likes;
    }
  };

  return (
    <div style={ {
      fontSize: '18px',
      marginLeft: '5px',
      marginBottom: '5px'
    } }>{ formatNumOfLikes({ likes: numOfLikes }) }</div>
  );
};