import React from 'react';
import Router, {Route} from 'react-router';
import Movie from './scripts/components/Movie';
import MovieList from './scripts/components/MovieList';
import MovieBox from './scripts/components/MovieForm';
import MovieForm from './scripts/components/MovieForm';
import Login from './scripts/components/Login';
import Signup from './scripts/components/Signup';
import Home from './scripts/components/Home';



var routes = (
    <Route>
        <Route name="login" handler={Login}/>
        <Route name="signup" handler={Signup}/>
        <Route name="home" path="/" handler={Home}/>
        <Route name="moviebox" handler={MovieBox}/>
    </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

let jwt = localStorage.getItem('jwt');
if (jwt) {
    LoginActions.loginUser(jwt);
}

router.run(function (Handler) {
    React.render(<Handler />, document.getElementById('content'));
});