import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  box-sizing: border-box;

  path{
    fill: #bbb;
  }

  .haveContent{
    fill: #222;
    cursor: pointer;
  }

  #modal{
    position: absolute;
    top: ${props => props.scrollOffset}px;
    left: 0;
    width: 100%;
    height: ${props => props.window}px;
    background-color: #00000090;
    display: none;
  }

  .modalActive{
    display: flex !important;
    justify-content: center;
    align-items: center;
    padding: 100px;
    animation-name: fadeIn;
    animation-duration: 300ms;
    animation-timing-function: ease-out;
  }

  .closeBtn{
    fill: red !important;
    height: 25px;
    width: 25px;
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
  }

  @keyframes fadeUp {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to{
            transform: translateY(0);
            opacity: 100;
        }
    }

    @keyframes fadeIn {
      from{
        opacity: 0;
      }
      to{
        opacity: 100;
      }
    }


  .modalCard{
    position: relative;
    pointer-events:  !important;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 99;
    padding: 30px;
    animation-name: fadeUp;
    animation-duration: 500ms;
    
    ul{
      margin: 0;
      list-style-type: none;
    }
    h1{
      margin: 0;
    }
  }
`;
