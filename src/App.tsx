import React from 'react';
import './App.css';
import { Container, Grid } from '@material-ui/core';
import CharacterList from './components/CharacterList/CharacterList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import Header from './components/Header/Header';

function App() {
  return (
      <Container className="App">
        <Grid container spacing={3} justify="center" alignItems="center">
          <Header />
          <Grid item xs={12} md={7}>
            <Router>
              <Switch>
                <Route path='/index/:pageId'>
                  <CharacterList />
                </Route>
                <Route path='/character/:characterId'>
                  <CharacterDetails />
                </Route>
                <Redirect from="/" to="/index/0" />
              </Switch>
            </Router>
          </Grid>
        </Grid>
      </Container>
  )
}

export default App;
