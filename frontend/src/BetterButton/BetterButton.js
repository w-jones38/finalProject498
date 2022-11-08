import './BetterButton.css'
function BetterButton(props) {
    return(
        <button class="button-89"
            role="button"
            disabled={props.disabled}
            onClick={props.onClick}
        >
        {props.text}
        </button>
    );
}

export default BetterButton
