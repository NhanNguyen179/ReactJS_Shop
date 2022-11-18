import React from 'react';

import styled from 'styled-components';

interface ValueProps {
  value: string;
  size? : string ;
  color? : string ;
}
interface StyledValue {
  size ?: string;
  color ?: string ;
}
const Value: React.FC<ValueProps> = ({value,size,color}) => {
  return <StyledValue size = {size} color={color}>{value}</StyledValue>;
};

const StyledValue = styled.span<StyledValue>`
  font-size: ${(props) => (props.size ? props.size: '36px')};
  font-weight: 700;
  color : ${(props) => (props.color ? props.color: '')};
`;

export default Value;
