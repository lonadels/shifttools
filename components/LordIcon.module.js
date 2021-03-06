import lottie from 'lottie-web';
import {defineLordIconElement} from 'lord-icon-element';

defineLordIconElement(lottie.loadAnimation);

const LordIconModule = (props) => {
    const {src, size, color, target, trigger, state, className} = props;

    return (
        <lord-icon trigger={trigger}
                   class={className}
                   colors={`primary:${color}`}
                   state={state}
                   target={target}
                   src={`https://cdn.lordicon.com/${src}.json`}
                   style={{
                       width: size,
                       height: size,
                       paddingBottom: 2
                   }}
        />
    );
};

export default LordIconModule