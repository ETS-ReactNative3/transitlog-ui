import React from "react";

import {Svg, G, Path} from "react-primitives-svg";
import PropTypes from "prop-types";

import {svgSize} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 32 32"
      version="1.1"
      preserveAspectRatio="xMidYMid meet">
      <G fill={fill}>
        <Path d="M15.641524,8.86905567 C14.0148602,8.98085008 13.2435614,9.13448933 11.3323971,9.35807815 C9.74631703,9.54356944 9.6562459,8.09544667 10.2476094,6.81865872 C10.9358771,5.33410388 11.8543955,3.63178935 11.0443765,2.27256083 C10.5439124,1.43358229 9.11788974,0.720554613 8.78265951,2.28984004 C8.28157416,4.63481631 5.73183658,7.60975512 4.39857686,8.92359969 C3.07732661,10.2264105 3.1810637,11.9322642 1.26637933,11.9322642 L0,11.9322642 L0,18.9534529 L1.29143359,18.9534529 C4.94024597,18.9621966 4.02856053,20.8533333 11.890631,20.8533333 C12.176581,20.8533333 12.6242448,20.8383441 12.8700251,20.8289759 C12.9791457,20.8248122 13.0758428,20.7604836 13.1228454,20.6615965 L17.4659302,11.5431697 C17.4659302,11.5431697 17.8028169,10.9429773 17.8028169,10.0629867 C17.8028169,9.43448141 17.2843385,8.75622034 15.641524,8.86905567" />
        <Path d="M16.3228907,24.7068258 C17.9506064,24.595465 18.7227094,24.4424216 20.6353531,24.2194925 C22.2226608,24.0347206 22.3128017,25.4774346 21.7209804,26.7490635 C21.03218,28.2280684 20.1129506,29.9235736 20.9235966,31.2775308 C21.4242409,32.113463 22.8515746,32.823518 23.1868571,31.2603186 C23.6885375,28.9244366 26.2402487,25.9612426 27.5743332,24.6524933 C28.8968133,23.3545277 28.7927887,21.655497 30.7091624,21.655497 L31.9765219,21.655497 L31.9765219,14.6615379 L30.6840887,14.6615379 C27.0322448,14.6528281 27.9448431,12.7688182 20.0766871,12.7688182 C19.7903086,12.7688182 19.3422982,12.7839566 19.0963277,12.7932885 C18.9873298,12.797436 18.8905579,12.8615152 18.8433116,12.9600187 L14.4970724,22.0430826 C14.4970724,22.0430826 14.1599249,22.6409472 14.1599249,23.5175251 C14.1599249,24.1433855 14.6788046,24.8192235 16.3228907,24.7068258" />
      </G>
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Icon.displayName = "Icons.Feedback";
