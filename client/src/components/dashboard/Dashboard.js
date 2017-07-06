import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Image} from 'react-bootstrap';
import {Route} from 'react-router';
import './Dashboard.css';
import Articles from './routes/Articles';
import ListItem from './components/ListItem';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.state = {
      sidebarVisible: true
    };
  }

  toggleSidebar() {
    this.setState({sidebarVisible: !this.state.sidebarVisible})
  }

  render() {
    const sidebarClass = this.state.sidebarVisible ? 'sidebar' : 'sidebar sidebarWrapped';
    const contentWrapperClass = this.state.sidebarVisible ? 'contentWrapper' : 'contentWrapper contentWrapperExpand';

    return (
      <div id="dashboard">
        <div className={sidebarClass}>
          <h3 className="invert">Orpheus</h3>
          <div className="sidebarMenu">
            <ul>
              <ListItem fa="file-text-o" name="Main Panel" active/>
              <ListItem fa="file" name="Articles"/>
              <ListItem fa="user" name="User Profile"/>
              <ListItem fa="window-maximize" name="Data Entry"/>
              <ListItem fa="folder-open-o" name="Projects"/>
              <ListItem fa="cog" name="Settings"/>
            </ul>
          </div>
        </div>
        <div className={contentWrapperClass}>
          <div className="topNav">
            <a href="#" onClick={this.toggleSidebar} className="toggleSidebar">
              <FontAwesome name="caret-left"/>
              <FontAwesome name="bars" size="2x"/>
            </a>
            <input type="text" className="searchInput" placeholder="Search..."/>
            <div className="navigation pull-right">
              <a href="#">
                <div className="userPanel">
                  <div className="userImage">
                    <span className="status"/>
                    <Image src="/images/bw.png" circle/>
                  </div>
                  <div>
                    Bruce Wayne
                  </div>
                  <FontAwesome name="arrow-down"/>
                </div>
              </a>
              <div className="notifications">
                <div className="notification">
                  <FontAwesome name="bell"/>
                  <span className="notificationBadge">13</span>
                </div>
                <div className="notification">
                  <span className="notificationBadge">1</span>
                  <FontAwesome name="envelope-o"/>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboardContent">
            <Route path="/dashboard/articles" component={Articles}/>
          </div>
        </div>
      </div>
    );
  }
}
