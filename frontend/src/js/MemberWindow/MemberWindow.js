import React from 'react';
import '../../css/MemberWindow.css';
import MemberWindowMember from './MemberWindowMember';
import JoIcon from '../../public/images/JoIcon.png';
import onClickOutside from 'react-onclickoutside';

class MemberWindow extends React.Component {
  handleClickOutside = () => {
    this.props.hideMembers();
  }
  
  render() {
    
    return (
      <div>
          <div className="memberWindow">
            <div className="memberWindow__top">
              <h4>Members</h4>
            </div>
            <div className="memberWindow__body">
              <div className="memberWindow__bodyInput">
                <input placeholder="Search Members" type="text" />
              </div>
              <div className="memberWindow__member">
                <MemberWindowMember
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                  name="Danesh Balmer"
                />
                <MemberWindowMember
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                  name="Tracy Kepler"
                />
                <MemberWindowMember
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                  name="Ron Torkelson"
                />
                <MemberWindowMember src={JoIcon} name="Jo Johnson" />
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default onClickOutside(MemberWindow);
