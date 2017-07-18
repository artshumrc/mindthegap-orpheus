import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Home from './home/Home';
import Page from './pages/Page/Page';
import Dashboard from './dashboard/Dashboard';
import Articles from './dashboard/routes/Articles';
import Articles2 from './dashboard/routes/Articles2';
import Articles3 from './dashboard/routes/Articles3';
import MainPanel from './dashboard/routes/MainPanel';
import UserProfile from './dashboard/routes/UserProfile';
import UserProfileTimeline from './dashboard/routes/UserProfileTimeline';
import ExampleForms from './dashboard/routes/ExampleForms';
import Test from './dashboard/routes/Test';

export default (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/page/new" component={Page} />
    <Route path="/page" component={Page} />
    <Route path="/test" component={Test} />
    <Route path="/dashboard" component={Dashboard}>
      <IndexRoute component={MainPanel} />
      <Route path="/dashboard/articles" component={Articles} />
      <Route path="/dashboard/articles2" component={Articles2} />
      <Route path="/dashboard/articles3" component={Articles3} />
      <Route path="/dashboard/user" component={UserProfile} />
      <Route path="/dashboard/user2" component={UserProfileTimeline} />
      <Route path="/dashboard/form" component={ExampleForms} />
    </Route>
  </div>
);
