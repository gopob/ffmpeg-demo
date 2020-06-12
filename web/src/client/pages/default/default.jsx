import React from 'react';
import ReactPlayer from 'react-player/lazy';

import { getThumbnail } from 'resources/default/default.api';

import styles from './default.pcss';

const Default = () => {
  const [url, setUrl] = React.useState('');
  const [second, setSecond] = React.useState(null);
  const [image, setImage] = React.useState();
  const [loading, setLoading] = React.useState(null);
  const [isVideo, setIsVideo] = React.useState(null);

  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const checkVideo = (data) => {
    if (data.split('.').pop() == 'mp4' || data.split('.').pop() == 'mov') {
      setIsVideo(true);
    } else {
      setIsVideo(false);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    setImage(null);
    const { data: { data64 } } = await getThumbnail({ url, second });
    setImage(data64);
    setLoading(false);
  };

  const handleDownload = () => {
    const blob = b64toBlob(image, 'image/jpg');
    const blobUrl = URL.createObjectURL(blob);
    const fileName = 'Thumbnail.jpg';
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';

    a.href = blobUrl;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <div className={styles.title}>
          <h1>Create Thumbnail from video using FFMPEG</h1>
          <p>Please enter URL for open-source video and second to extract desired frame</p>
        </div>
      </div>
      <div className={styles.row}>
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            checkVideo(e.target.value);
          }}
          placeholder="Enter video URL"
        />
      </div>
      <div className={styles.row}>
        <input
          type="number"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
          placeholder="Enter second"
        />
      </div>
      <div className={styles.row}>
        <button
          type="button"
          disabled={loading}
          onClick={handleClick}
        >
          Get Thumbnail
        </button>
      </div>
      <div className={styles.row}>
        {isVideo == false ? (
          <>
            Please check the url
          </>
        ) : (
          <>
            {url ? (
              <ReactPlayer
                url={url}
                controls
                className={styles.video}
              />
            ) : (
              <div className={styles.noVideo}>
                <p>Upload video</p>
              </div>
            )}
          </>
        )}
      </div>
      <div className={styles.row}>
        {loading ? (
          <div>
            Loading image
          </div>
        ) : (
          <>
            {image ? (
              <>
                <img className={styles.image} src={`data:image/jpg;base64,${image}`} alt="" />
                <button
                  type="button"
                  onClick={handleDownload}
                >
                    Download
                </button>
              </>
            ) : (
              <div className={styles.noImage}>
                <p>No Image</p>
              </div>
            )}
          </>
        )}
      </div>

      <div className={styles.row}>
        <a target="_blank" href="https://gist.github.com/jsturgis/3b19447b304616f18657">
          Examples of Open-source videos
        </a>
      </div>
    </div>
  );
};

export default React.memo(Default);
