import React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {Home} from './pages/home'
import {Quiz} from './pages/quiz'
import {Result} from './pages/result'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/quiz'>
            <Quiz/>
          </Route>
          <Route exact path='/quiz/result'>
            <Result/>
          </Route>
          <Route path='*'>
            <h1>404</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
