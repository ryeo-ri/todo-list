import React from 'react'
import styled, { css, keyframes } from 'styled-components'

const StyledButton = styled.button`
    color : ${ prop => prop.color || 'white' };
    background :${ prop => prop.background || '#666' };
    padding : 10px;
    margin : 10px;
    //변경해야 하는 속성이 많은 경우 함수를 밖에 사용 
    ${ 
        prop => 
            prop.primary &&
            `
            color: teal;
            background : #fff;
            border: 3px solid #000; 
            `
    }

    ${
      prop =>
        prop.ani &&
        css`animation: ${rotate} 2s linear infinite`
    }
   
`;

          /*animation*/
          //1.keyframe 추가
const rotate = keyframes`
    from {transform:rotate(0deg)}
    to{transform:rotate(360deg)}
`;





function Button({children, ...props}) {
  return (
    <StyledButton {...props}>{children}</StyledButton>
    //가지고 있는 인자가 StyledButton함수로 전달된다. 
  )
}

export default Button 

