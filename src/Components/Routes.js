import React from "react";
import propTypes from "prop-types";
import { Route, Switch, Redirect} from "react-router-dom";
import Feed from "../Routes/Feed";
import Auth from "../Routes/Auth";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
import FullFeed from "../Routes/FullFeed";
import Notifications from "../Routes/Notifications";

const LoggedInRoutes = () => (
<Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/fullFeed/:id" component={FullFeed} />
    <Route path="/notifications" component={Notifications} />
    <Route path="/search" component={Search} />
    <Route path="/:username" component={Profile} />
    <Redirect from="*" to="/" />
</Switch>
);
const LoggedOutRoutes = () => (
<Switch>
    <Route exact path="/" component={Auth} />
    
    <Redirect from="*" to="/" />
</Switch>);
const AppRouter = ({ isLoggedIn}) => 
    
   isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes /> ;
    


AppRouter.propTypes = {
    isLoggedIn: propTypes.bool.isRequired
};

export default AppRouter;