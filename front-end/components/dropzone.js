import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import style from '../styles/Dropzone.module.css';
import {guidGenerator} from '../helpers/guidGenerator';

export default function MyDropzone() {

  const [state, setState] = useState({ images: [], userLoadMoreItem: false });

  const setImgsIntoState = (imagesArray) => {
    setState({
      ...state,
      images: [...state.images, ...imagesArray]
    });
  };

  const onDrop = (acceptedFiles) => {
    setState({ ...state, userLoadMoreItem: true });
    let newImages = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
      guid: guidGenerator()
    }));
    setImgsIntoState(newImages);
  };

  const removeImage = (imageGuid) => {
    let findImageIndex = state.images.findIndex(x => x.guid === imageGuid);
    let newArray = [...state.images];
    if(findImageIndex !== -1) {
      newArray.splice(findImageIndex, 1);
      setState({
        ...state,
        images: newArray
      });
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <React.Fragment>
      <div {...getRootProps()} className={style.container}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div className={style.imageWrapper}>
        {state.images.length > 0 && (state.images.map((img, index) => (
          <div key={index} className={style.imageItem}>
            <img src={img.preview} />
            <button className={style.delBtn} onClick={() => removeImage(img.guid)}>X</button>
          </div>
        )
        ))}
      </div>
    </React.Fragment>
  )
}