import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import style from '../styles/Dropzone.module.css';
import {guidGenerator} from '../helpers/guidGenerator';
import ProgressBar from'../components/progressBar';

export default function MyDropzone() {

  const [state, setState] = useState({ images: [], isUploading: false , percentage: 0});

  const setImgsIntoState = (imagesArray) => {
    setTimeout( () => {
      setState({
        ...state,
        images: [...state.images, ...imagesArray],
        isUploading: false,
        percentage: 100
      });
    }, 500);
  };
 
  const onDrop = (acceptedFiles) => {
    setState({ ...state, isUploading: true, percentage: acceptedFiles && acceptedFiles.length > 1 ? Math.round(100 / acceptedFiles.length) : 50 });
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
      {state.isUploading ? <ProgressBar style={style} isUploading={state.isUploading} percentage={state.percentage}/> : <div>Please upload an image</div>}
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