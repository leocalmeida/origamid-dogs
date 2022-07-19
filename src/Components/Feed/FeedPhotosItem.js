import React from 'react';
import Image from '../Helper/Image';
import styles from './FeedPhotosItem.module.css';

// componente foto, que mostra a foto e tem um hover q mostra os acessos
const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo);
  }

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.visualization}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
