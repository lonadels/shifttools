import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import LordIconModule from "./LordIcon.module";

const LordIcon = dynamic(() => import('../components/LordIcon.module'), {
    ssr: false,
});

export default LordIcon;

LordIcon.defaultProps = {
    size: 24,
    color: "#ffffff",
    trigger: "loop",
    state: "hover",
}

LordIcon.propTypes = {
    src: PropTypes.string.isRequired,
    size: 24,
    color: PropTypes.string,
    trigger: 'hover' | 'click' | 'loop' | 'loop-on-hover' | 'morph' | 'morph-two-way',
    state:  'intro' | 'hover' | 'hover-1' | 'hover-2' | 'hover-3' | 'morph',
    target: PropTypes.object,
    // style: PropTypes.
};