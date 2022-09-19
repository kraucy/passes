import React, { useEffect, useState } from 'react';
import { HeartButton } from '../components/HeartButton';
import { Likes } from '../components/Likes';
import '../App.css';

const mockLikeId = 1;
const mockUserId = 1;

export const Home = () =>
{
  const [ isHeartFull, setIsHeartFull ] = useState(null);
  const [ likeCount, setLikeCount ] = useState(null);

  const fetchLikeCount = async ({ likeId }) =>
  {
    try
    {
      const { data } = await fetch(`http://localhost:3001/api/v1/like/${ likeId }/count`, { medhot: 'GET' })
        .then((response) => response.json())
        .then((data) => data);
      setLikeCount(data);
    } catch (error)
    {
      console.log('error', error);
    }
  };

  const updateLikeCount = async ({ likeId, userId }) =>
  {
    try
    {
      const { data } = await fetch(`http://localhost:3001/api/v1/like/${ likeId }/user/${ userId }`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => data);
      if (data)
      {
        const removedLikeResult = await fetch(`http://localhost:3001/api/v1/like/remove`, {
          method: 'POST', body: JSON.stringify({
            likeId, userId
          })
        })
          .then((response) => response);
        return removedLikeResult;
      } else
      {
        const { data } = await fetch(`http://localhost:3001/api/v1/like/add`, {
          method: 'POST', body: JSON.stringify({
            likeId, userId
          })
        })
          .then((response) => response);
        return data;
      }
    } catch (error)
    {
      console.log('error updating like count', error);
    } finally
    {
      fetchLikeCount({ likeId });
    }
  };

  const handleButtonClick = async () =>
  {
    try
    {
      await updateLikeCount({ likeId: mockLikeId, userId: mockUserId });
      setIsHeartFull(true);
      setTimeout(() =>
      {
        setIsHeartFull(false);
      }, 1000);
    } catch (error)
    {
      console.log('error filling your heart :(', error);
    }
  };

  const debounce = (func, timeout = 1000) =>
  {
    let timer;
    return (...args) =>
    {
      clearTimeout(timer);
      timer = setTimeout(() =>
      {
        func.apply(this, args);
      }, timeout);
    };
  };

  const debounceClick = debounce(() => handleButtonClick());

  useEffect(() =>
  {
    // Fetch initial like count here:
    (async () =>
    {
      await fetchLikeCount({ likeId: 1 });
    })();

  }, [ likeCount ]);

  return (
    <div style={ {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    } }>
      <HeartButton fillColor={ isHeartFull ? 'red' : undefined } onClick={ debounceClick } />
      { likeCount > 0 &&
        <Likes numOfLikes={ likeCount } />
      }
    </div>
  );
};