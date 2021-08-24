import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Notes/Notes';
import Create from './Form/Create/Create';
import NavBar from './NavBar/NavBar';

const App = () =>(
    <BrowserRouter>
        <Container maxWidth='xl'>
            <NavBar />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/create' exact component={Create} />
            </Switch>
        </Container>
    </BrowserRouter>
    )


export default App;