import lottie from 'lottie-web';
import {defineLordIconElement} from 'lord-icon-element';
import PropTypes from "prop-types";

defineLordIconElement(lottie.loadAnimation);

const LordIconModule = (props) => {
    const {src, size, color, target, trigger, state} = props;

    console.log(props);

    return (
        <lord-icon trigger={trigger}
               colors={`primary:${color}`}
               state={state}
               target={target}
               src={`https://cdn.lordicon.com/${src}.json`}
               style={{
                   width: size,
                   height: size,
                   paddingBottom: 2
               }}/>
    );
};

export default LordIconModule

LordIconModule.defaultProps = {
    size: 24,
    color: "#ffffff",
    trigger: "loop",
    state: "hover",
}

LordIconModule.propTypes = {
    src: PropTypes.string.isRequired,
    size: 24,
    color: PropTypes.string,
    trigger: 'hover' | 'click' | 'loop' | 'loop-on-hover' | 'morph' | 'morph-two-way',
    state:  'intro' | 'hover' | 'hover-1' | 'hover-2' | 'hover-3' | 'morph',
    target: PropTypes.object,
    // style: PropTypes.
};