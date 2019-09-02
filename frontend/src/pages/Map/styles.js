import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  box-sizing: border-box;

  nav{
    width: 100%;
    background-color: #222;
    color: #fff;
    font-weight: bold;
    margin: 0 0 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;

    select{
      padding: 5px 30px;
      margin: 20px 0 0 0;
      background-color: #f5f5f555;
      border: 2px solid #aaa;
      border-top-left-radius: 10px;
      border-bottom-right-radius: 10px;
      transition: ease-in-out;
      transition-duration: 200ms;
      font-weight: bold;
      &:hover{
        border: 2px solid #ddd;
      }
      &:focus{
        border: 2px solid #e8c52a;
      }
    }
  }

  path{
    fill: #bbb;
  }

  /* Active country active */
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
    border-radius: 5px;
    
    ul{
      margin: 0;
      list-style-type: none;
      display: flex;
      li{
        padding: 20px;
        box-shadow: 0 0 4px #2223;
        border-radius: 5px;
        margin: 20px 20px 20px 0;
      }
    }
    h1{
      margin: 0;
    }
  }
`;
