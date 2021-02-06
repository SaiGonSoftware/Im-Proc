import  React   from 'react';

export default function ProgressBar(props){
    const { isUploading , percentage , style } = props;
    return (<div className={style.progressBar}>
        {isUploading && percentage > 0 && <div className={style.percentage} style={{width: `${percentage}%`}}>{`${percentage}%`}</div>}
        </div>)
}