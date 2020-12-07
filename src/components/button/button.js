import styled from 'styled-components';

const Button = styled.div`
    a {
        background-color:  ${props => props.brown ? 'rgb(208, 168, 92)' : 'rgb(11, 198, 227)'};
        color: #fff;
        font-size: ${props => props.sm ? '0.625rem' : '0.8125rem'};
        font-weight: 700;
        height: ${props => props.sm ? '27px' : '56px'};
        min-width: ${props => props.sm ? '215px' : '195px'};
        letter-spacing: 0.1em;
        transition: all .4s ease;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 10px;
        position: relative;

        &:hover {
            box-shadow: 0 0 0 4px rgba(255,255,255, .5);
            color: rgba(255,255,255, .8);
        }
    }

`

export default Button;