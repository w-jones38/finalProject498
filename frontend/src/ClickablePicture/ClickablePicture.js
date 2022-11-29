import './ClickablePicture.css'

function ClickablePicture(props) {
    return (
        <div className="pictureContainer">
            <img onClick={props.onClick} 
                src={props.src} 
                className={!props.shouldOpaque?'picture':'pictureNoOpaque'}/>
            <figcaption className='pictureCaption'>{props.text}</figcaption>
        </div>
    )
}

export default ClickablePicture
