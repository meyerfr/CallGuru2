import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faBrain, faBook, faUser, faUsers, faChartPie, faCog } from '@fortawesome/free-solid-svg-icons'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import OverlayNavLink from '../components/navLink'

// import Left
import CallGuruLogo from '../../../assets/images/callguru_favicon.svg'
import Abschluss from '../../../assets/images/abschluss.png'

const navLinks1 = [
  {
    title: 'Playbooks',
    path: '/playbooks',
    icon: faBook
  },
  {
    title: 'Knowledge',
    path: '/knowledge',
    icon: faBrain
  },
  {
    title: 'Insights',
    path: '/insights',
    icon: faChartPie
  },
  {
    title: 'Teams',
    path: '/teams',
    icon: faUsers
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: faCog
  },
  {
    title: 'Backlog',
    path: '/backlog',
    icon: faCog
  },
]

const navLinks2 = [
  {
    title: 'CallGuru Chat',
    path: '/',
    icon: faQuestion
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: faUser
  }
]

class AppNavigation extends Component {
  render() {
    const currentUser = this.props.currentUser
    return (
      currentUser ?
        <div className="callguru-app-navigation">
          <div className="logo center">
            <NavLink activeClassName="active" to={`/`}>
              <img src={CallGuruLogo} alt="CallGuru Logo" />
            </NavLink>
          </div>
          <div className="navbar-actions">
            <div className="list">
              {
                navLinks1.map(navLink => {
                  if ((navLink.title == 'Backlog' && currentUser.role == 'CallGuru Admin') || navLink.title != "Backlog") {
                    return (
                      <OverlayNavLink key={navLink.title} position="right" tooltip_text={navLink.title}>
                        <NavLink activeClassName="active" to={navLink.path}>
                          <FontAwesomeIcon icon={navLink.icon} />
                        </NavLink>
                      </OverlayNavLink>
                    )
                  }
                })
              }
            </div>
            <div className="list">
              {
                navLinks2.map(navLink => {
                  return (
                    <OverlayNavLink key={navLink.title} position="right" tooltip_text={navLink.title}>
                      <NavLink activeClassName="active" to={navLink.path}>
                        <FontAwesomeIcon icon={navLink.icon} />
                      </NavLink>
                    </OverlayNavLink>
                  )
                })
              }
            </div>
          </div>
        </div>
      :
        <div></div>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ someAction }, dispatch);
// }

export default connect(mapStateToProps, null)(AppNavigation);
