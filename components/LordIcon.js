import lottie from 'lottie-web';
import {defineLordIconElement} from 'lord-icon-element';

defineLordIconElement(lottie.loadAnimation);

const LordIcon = () =>
    <lord-icon trigger="loop-on-hover"
               colors="primary:#fff"
               state="hover-3"
               target="#target"
               src="https://cdn.lordicon.com/gwlkhzue.json"
               style={{
                   width: 25,
                   height: 25,
                   paddingBottom: 2
               }}/>

export default LordIcon