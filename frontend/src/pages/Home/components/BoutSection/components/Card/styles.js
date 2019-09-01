import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #f5f5f5;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  position: relative;

  @media (min-width: 500px) {
    width: 300px;
    span{
      font-size: 14px !important;
    }
  }
  .profile{
    height: 200px;
    margin: 0;
    width: 100%;
    background: url(${ props => props.srcImg });
    background-size: cover;
    background-position: center;
  }
  h1{
    color: #222;
    font-size: 26px;
    margin: 0 0 30px 0;
  }
  span{
    font-weight: 500;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    margin: 20px 0 0 0;
    font-size: 18px;
    margin: 20px 0 0 0;
    background-color: ${ props => props.officeColor };
    color: #fff;
    padding: 10px;
  }
  div{
    padding: 20px;
    margin: 0;
    flex-direction: column;
  }
`;
