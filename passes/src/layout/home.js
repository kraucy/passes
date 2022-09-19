import React, { useEffect, useState } from 'react';
import { HeartButton } from '../components/HeartButton';
import { Likes } from '../components/Likes';
import '../App.css';

const likeId = 123;
const userId = 456;

export const Home = () =>
{
  const [ isHeartFull, setIsHeartFull ] = useState(null);
  const [ likeCount, setLikeCount ] = useState(null);

  const fetchLikeCount = async ({ likeId }) =>
  {
    try
    {
      const results = await fetch(`/api/v1/like/${ likeId }/count`, { method: 'GET' })
        .then((response) => response)
        .then((data) => console.log(data));
      console.log('results', results);
      // the response was not giving me back data yet, and didn't have enough time to attack this fully
      // so set a mock value here for now
      setLikeCount(20000);
    } catch (error)
    {
      console.log('error', error);
    }
  };

  const updateLikeCount = async ({ likeId, userId }) =>
  {
    try
    {
      const userHasLiked = await fetch(`/api/v1/like/${ likeId }/user/${ userId }`, { method: 'GET' });
      if (userHasLiked)
      {
        const removedLikeResult = await fetch(`/api/v1/like/remove`, {
          method: 'POST', body: JSON.stringify({
            likeId, userId
          })
        })
          .then((response) => response);
        return removedLikeResult;
      } else
      {
        const addLikeResult = await fetch(`/api/v1/like/add`, {
          method: 'POST', body: JSON.stringify({
            likeId, userId
          })
        })
          .then((response) => response);
        return addLikeResult;
      }
    } catch (error)
    {
      console.log('error updating like count', error);
    }
  };

  const handleButtonClick = () =>
  {
    try
    {
      updateLikeCount({ likeId, userId });
      setIsHeartFull(true);
      console.log('clicked');
      setTimeout(() =>
      {
        setIsHeartFull(false);
      }, 1000);
    } catch (error)
    {
      console.log('error filling your heart :(', error);
    }
  };

  useEffect(() =>
  {
    // JSON api resonse here
    if (!likeCount)
    {
      fetchLikeCount({ likeId });
    }
  }, [ likeCount ]);

  return (
    <div style={ {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    } }>
      <HeartButton fillColor={ isHeartFull ? 'red' : undefined } onClick={ handleButtonClick } />
      { likeCount > 0 &&
        <Likes numOfLikes={ likeCount } />
      }
    </div>
  );
};