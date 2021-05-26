import React from 'react'
import { Link, NavLink } from 'react-router-dom'


import CallGuruLogo from '../../../assets/images/callguru_favicon.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faBrain, faBook, faUser, faUsers, faChartPie, faCog } from '@fortawesome/free-solid-svg-icons'

import OverlayNavLink from '../components/navLink'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'



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


const CallNavigation = (props) => {
  return(
    <div className="callguru-app-navigation in-call">
      <div className="logo center">
        <img src={CallGuruLogo} alt="CallGuru Logo" />
      </div>
      <div className="navbar-actions">
        <div className="list">
          {
            props.sections && props.sections.map(section => {
              return (
                <OverlayNavLink key={section.title} position="right" tooltip_text={section.title}>
                  <NavLink activeClassName="active" className="center" to={props.url(section.id)}>
                    <img src={CallGuruLogo} alt="CallGuru Logo" />
                  </NavLink>
                </OverlayNavLink>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default CallNavigation
