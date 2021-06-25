import React, { Component } from 'react'

import CallGuruLogoFaviconWhite from '../../../assets/images/logo_solo_white.svg'
import CallGuruLogoWhite from '../../../assets/images/callguru_logo_white.svg'
import CallGuruLogoFaviconBlue from '../../../assets/images/logo_solo_blue.svg'
import CallGuruLogoBlue from '../../../assets/images/logo_banner_blue.svg'


class Sidebar2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: true,
      changeImage: false,
      activeLogo: props.activeLogo || false,
      lightStyle: props.lightStyle || false
    }
  }

  toggleExpansion = () => {
    this.setState({
      expanded: !this.state.expanded,
      changeImage: !this.state.changeImage
    })
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


  render() {
    const {top, bottom, inCall, endCall} = this.props
    const { expanded, changeImage, activeLogo, lightStyle } = this.state
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
          <div className="list">{top}</div>
          <div onClick={this.toggleExpansion} className="pointer"></div>
          <div className="list gap">
          {
            inCall ?
              expanded ?
                <button className={`secondary end-call ${changeImage ? ' switch' : ''}`} id="phone" onClick={endCall}>End Call</button>
              :
                <i className="fas fa-phone-slash"></i>
            :
              bottom
          }
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar2;
