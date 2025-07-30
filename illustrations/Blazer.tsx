import * as React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';

const Blazer = (props: any) => (
  <Svg width={80} height={80} viewBox="0 0 80 80" fill="none" {...props}>
    <Rect width={80} height={80} rx={18} fill="#D6EAD7" />
    <Path d="M20 60 L40 20 L60 60 Z" fill="#B7C9A8" />
    <Path d="M40 20 L35 60 L45 60 Z" fill="#22223B" />
    <Circle cx={40} cy={50} r={2} fill="#22223B" />
  </Svg>
);

export default Blazer; 