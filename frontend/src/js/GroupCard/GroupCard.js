import React from 'react';
import ReactCardFlip from 'react-card-flip';

import GroupCardFront from './GroupCardFront';
import GroupCardBack from './GroupCardBack';

class GroupCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    const { curGroup, image } = this.props;

    return (
      <ReactCardFlip isFlipped={this.state.isFlipped}>
        <div onClick={this.handleClick}>
          <GroupCardFront curGroup={curGroup} image={image} />
        </div>

        <div onClick={this.handleClick}>
          <GroupCardBack curGroup={curGroup} />
        </div>
      </ReactCardFlip>
    );
  }
}

export default GroupCard;
