import React from 'react';
import './Header.scss';
import MenuBars from '../menu-bars/MenuBars';

class Header extends React.Component {
    render() {
        return (
            <div className="header-wrapper">
                <div className="Header">
                    <div className="header-inner">
                        <div className="menu-bars-wrapper d-flex">
                            <MenuBars/>
                            {this.props.user ? <div className="page-name">Widgets</div> : null}
                        </div>
                        <div className="logo">N</div>
                        <div className="icons">
                            <img src="/Icons/close.png" className="d-lg-none"
                                 style={{transform: 'rotateZ(45deg) scale(0.8)'}}/>
                            <img src="/Icons/search.png" className="d-none d-sm-block"/>
                            <div className="profile d-none d-sm-block" style={{backgroundImage: 'url("avatar.jpg")'}}
                                 onClick={this.props.toggleProfile}/>
                            <img src="/Icons/bookmark.png" className="d-none d-lg-block"/>
                            <img src="/Icons/close.png" className="close-button" onClick={this.props.toggleProfile}/>
                        </div>
                    </div>
                </div>
                <div className="page-name d-flex d-sm-none">Widgets</div>
            </div>

        );
    }
}

export default Header;
