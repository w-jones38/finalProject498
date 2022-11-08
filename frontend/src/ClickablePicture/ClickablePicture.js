import './ClickablePicture.css'

function ClickablePicture(props) {
    return (
        <div onClick={props.onClick} className="pictureContainer">
            <img src={props.src} className='picture'/>
            <figcaption className='pictureCaption'>{props.text}</figcaption>
        </div>
    )
}

export default ClickablePicture
