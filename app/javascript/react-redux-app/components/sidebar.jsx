import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link, NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faFolderOpen, faComments, faUser, faUserFriends, faChartPie, faCog, faSignOutAlt, faUserLock } from '@fortawesome/free-solid-svg-icons'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import OverlayNavLink from '../components/navLink'

// import Left
import CallGuruLogoFaviconWhite from '../../../assets/images/logo_solo_white.svg'
import CallGuruLogoWhite from '../../../assets/images/callguru_logo_white.svg'
import CallGuruLogoFaviconBlue from '../../../assets/images/logo_solo_blue.svg'
import CallGuruLogoBlue from '../../../assets/images/logo_banner_blue.svg'

import { logoutUser } from '../actions'

const defaultLinks = [
  {
    title: 'Playbooks',
    path: '/',
    icon: faComments
  },
  // {
  //   title: 'Knowledge',
  //   path: '/knowledge',
  //   icon: faFolderOpen
  // },
  // {
  //   title: 'Insights',
  //   path: '/insights',
  //   icon: faChartPie
  // },
  // {
  //   title: 'Teams',
  //   path: '/teams',
  //   icon: faUserFriends
  // },
  {
    title: 'Settings',
    path: '/settings',
    icon: faCog
  },
  {
    title: 'Back office',
    path: '/backoffice',
    icon: faUserLock
  },
]

const navLinks2 = [
  // {
  //   title: 'Help',
  //   path: '/help',
  //   icon: faQuestion
  // },
  {
    title: 'Logout',
    path: '/profile',
    icon: faSignOutAlt
  }
]

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: true,
      changeImage: false,
      firstLinks: props.links || defaultLinks,
      activeLogo: false,
      lightStyle: props.lightStyle || false
    }
  }

  // componentDidUpdate(nextProps, nextState){
  //   if (this.props.firstLinks !== nextProps.firstLinks) {
  //     this.setState({
  //       firstLinks: nextProps.firstLinks
  //     })
  //   }
  // }

  toggleExpansion = () => {
    this.setState({
      expanded: !this.state.expanded,
      changeImage: !this.state.changeImage
    })
  }

  logout = (callback) => {
    this.props.logoutUser()
    .then(() => window.location.href = "/")
  }

  renderLogo = () => {
    if (this.state.lightStyle) {
      return(
        <img
          src={this.state.expanded ? CallGuruLogoBlue : CallGuruLogoFaviconBlue}
          alt="CallGuru Logo"
          style={{height: '48px'}}
        />
      )
    } else{
      return(
        <img
          src={this.state.expanded ? CallGuruLogoWhite : CallGuruLogoFaviconWhite}
          alt="CallGuru Logo"
          style={{height: '48px'}}
        />
      )
    }
  }

  render() {
    const { currentUser } = this.props
    const { expanded, changeImage, firstLinks, activeLogo, lightStyle } = this.state

    return (
      <div className={`sidebar${expanded ? ' expanded' : ''}${lightStyle ? ' light' : ''}`}>
        <div className="logo center">
          {
            activeLogo ?
              <NavLink activeClassName="active" to={'/'} className={`logo-container${changeImage ? ' switch' : ''}`}>
                {this.renderLogo()}
              </NavLink>
            :
              <div className={`logo-container pointer${changeImage ? ' switch' : ''}`} onClick={this.toggleExpansion}>
                {this.renderLogo()}
              </div>
          }
        </div>
        <div className="navbar-actions">
          <div className="list">
            {
              firstLinks.map(navLink => {
                if ((navLink.title == 'Back office' && currentUser.role == "CallGuru Admin") || navLink.title !== "Back office") {
                  return (
                    <OverlayNavLink key={navLink.title} position="right" tooltip_text={navLink.title}>
                      <NavLink activeClassName="active" exact={navLink.path === "/"} className="sidebar-item" to={navLink.path}>
                        <FontAwesomeIcon icon={navLink.icon} className="icon" />
                        <span className="small">{navLink.title}</span>
                      </NavLink>
                    </OverlayNavLink>
                  )
                }
              })
            }
          </div>
          <div onClick={this.toggleExpansion} className="pointer"></div>
          {
            lightStyle ?
              <div className="list">
                <button className={`secondary end-call`} onClick={this.props.endCall}>{`End${expanded ? ' Call' : ''}`}</button>
              </div>
            :
              <div className="list">
                {
                  navLinks2.map(navLink => {
                    if (navLink.title === 'Logout') {
                      return(
                        <OverlayNavLink key={navLink.title} position="right" tooltip_text={navLink.title}>
                          <a className="sidebar-item pointer" key={navLink.title} onClick={this.logout}>
                            <FontAwesomeIcon icon={navLink.icon} className="icon" />
                            <span className="small">{navLink.title}</span>
                          </a>
                        </OverlayNavLink>
                      )
                    }
                    return (
                      <OverlayNavLink key={navLink.title} position="right" tooltip_text={navLink.title}>
                        <NavLink activeClassName="active" className="sidebar-item" to={navLink.path}>
                          <FontAwesomeIcon icon={navLink.icon} className="icon" />
                          <span className="small">{navLink.title}</span>
                        </NavLink>
                      </OverlayNavLink>
                    )
                  })
                }
              </div>
          }
        </div>
      </div>
    );
  }
};


function mapStateToProps(state, ownProps) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
