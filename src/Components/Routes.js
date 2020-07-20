import React from "react";
import propTypes from "prop-types";
import { Route, Switch} from "react-router-dom";
import Feed from "../Routes/Feed";
import Auth from "../Routes/Auth";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";

const LoggedInRoutes =() => (
<Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route path="/:username" component={Profile} />

</Switch>
);
const LoggedOutRoutes = () => (
<Switch>
    <Route exact path="/" component={Auth} />
</Switch>);
const AppRouter = ({ isLoggedIn}) => 
    
   isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes /> ;
    


AppRouter.propTypes = {
    isLoggedIn: propTypes.bool.isRequired
};

export default AppRouter;