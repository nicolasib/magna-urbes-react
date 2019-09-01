import styled from 'styled-components';

export const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    strong{
        margin: 20px 0;
        font-size: 24px;
        text-align: center;
    }
    table{
        width: 100%;
        border: none;
        border-collapse: collapse;
        thead{
            background-color: #333;
            color: #fff;
            th{
                padding: 10px;
            }
        }
        tbody{
            text-align: center;
            td{
                div{
                    padding: 10px;
                }
            }
        }
    }
`;
