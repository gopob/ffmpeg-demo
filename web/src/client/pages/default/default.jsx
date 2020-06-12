import React from 'react';
import ReactPlayer from 'react-player/lazy'

import { getThumbnail } from 'resources/default/default.api';

import styles from './default.pcss';

const Default = () => {

  const [url, setUrl] = React.useState('')
  const [second, setSecond] = React.useState(null)

  const handleClick = async () => {
    await getThumbnail({ url: url, second: second })
  }

  return (
    <>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={'Enter video URL'}

      />
      <input
        type="number"
        value={second}
        onChange={(e) => setSecond(e.target.value)}
        placeholder={'Enter second'}
      />
      <button
        type='button'
        onClick={handleClick}
      >
        Get Thumbnail
      </button>
      {url ? (
        <ReactPlayer
          url={url}
          controls={true}
        />) : (
          'Upload video'
        )}
    </>
  );
}

export default React.memo(Default);
