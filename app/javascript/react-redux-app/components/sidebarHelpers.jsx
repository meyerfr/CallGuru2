import React from 'react';
import OverlayNavLink from './navLink';
import { NavLink } from 'react-router-dom';

export const CallSidebarTop = ({call_id, playbook_id, sections}) => {
  return[
    sections.map((section) => {
      return (
        <OverlayNavLink key={section.id} position="right" tooltip_text={section.title}>
          <NavLink activeClassName="active" className="sidebar-item pointer" to={`/calls/${call_id}/playbooks/${playbook_id}/sections/${section.id}`}>
            {
              section.icon?.includes('http') ?
                <img src={section.icon} alt="icon" className="icon" />
              :
                <i className={`icon fas fa-${section.icon}`} />
            }
            <span className="small">{section.title}</span>
          </NavLink>
        </OverlayNavLink>
      )
    })
  ]
}

export const CallSidebarBottom = ({endCall}) => {
  return(
    <button className={`secondary end-call`} onClick={endCall}>End Call</button>
  )
}

export const CallSummaryTop = () => {
  return (
    <a className="sidebar-item pointer active" key="Summary">
      <i className="icon fas fa-comments" />
      <span className="small">Summary</span>
    </a>
  )
}

export const CallSummaryBottom = ({repeatCall, backToPlaybooks}) => {
  return[
    <button key="playbookOverview" className={`secondary outline end-call`} onClick={backToPlaybooks}>Jump to overview</button>,
    <button key="repeatCall" className={`secondary end-call`} onClick={repeatCall}>Restart playbook</button>
  ]
}

export const AppSidebarTop = ({currentUser}) => {
  const defaultLinks = [
    {
      title: 'Playbooks',
      path: '/',
      icon: "comments"
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
      icon: "cog"
    },
    {
      title: 'Back office',
      path: '/backoffice',
      icon: "user-lock"
    },
  ]

  return[
    defaultLinks.map(navLink => {
      if ((navLink.title == 'Back office' && currentUser.role == "CallGuru Admin") || navLink.title !== "Back office") {
        return (
          <OverlayNavLink key={navLink.title} position="right" tooltip_text={navLink.title}>
            <NavLink activeClassName="active" exact={navLink.path === "/"} className="sidebar-item pointer" to={navLink.path}>
              <i className={`icon fas fa-${navLink.icon}`} />
              <span className="small">{navLink.title}</span>
            </NavLink>
          </OverlayNavLink>
        )
      }
    })
  ]
}

export const AppSidebarBottom = ({logout}) => {
  return(
    <OverlayNavLink key="logout" position="right" tooltip_text="Logout">
      <a className="sidebar-item pointer" key="Logout" onClick={() => logout()}>
        <i className={`icon fas fa-sign-out-alt`} />
        <span className="small">Logout</span>
      </a>
    </OverlayNavLink>
  )
}

export const EditPlaybookSidebarTop = ({ playbook_id, sections, addSection }) => {
  return[
    sections.map((section) => {
      return (
        <OverlayNavLink key={section.id} position="right" tooltip_text={section.title}>
          <NavLink activeClassName="active" className="sidebar-item pointer" to={`/playbooks/${playbook_id}/sections/${section.id}`}>
            <i className={`icon fas fa-${section.icon}`} />
            <span className="small">{section.title}</span>
          </NavLink>
        </OverlayNavLink>
      )
    }),
    <OverlayNavLink key="addSection" position="right" tooltip_text="Add Section">
      <a href="#" className="sidebar-item pointer">
        <i className="icon fas fa-plus-square" />
        <span className="small">Add Section</span>
      </a>
    </OverlayNavLink>
  ]
}

export const EditPlaybookSidebarBottom = ({ cancel, save }) => {
  return[
    <button key="cancel" className={`secondary outline end-call`} onClick={cancel}>Cancel</button>,
    <button key="save" className={`secondary end-call`} onClick={save}>Save</button>
  ]
}
