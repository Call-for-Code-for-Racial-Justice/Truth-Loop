import styled from 'styled-components'
import { commonVariables } from '../../styles/variables'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${commonVariables?.white};
`

export const MainDiv = styled.div`
  width: 45vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

export const Title = styled.h1`
  font-size: 4em;
  font-weight: 500;
`
