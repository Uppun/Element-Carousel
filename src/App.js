import React, { Component } from 'react';
import './App.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class CarouselElement extends Component {
  render() {
    return (
      <div className='carouselElement' style={this.props.style}>
        hi
      </div>
    )
  }
}

class CarouselComponent extends Component {
  state = {
    current: this.props.index,
    isLeft: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const newElementNum = React.Children.count(nextProps.children);
    let newIndex = nextProps.index % newElementNum;

    if (newIndex < 0) {
      newIndex += newElementNum;
    }
    
    return {current: newIndex};
  }

  handleClick = (amount) => {
    if (amount === 0) return;
    this.setState({isLeft: amount < 0});
    this.props.onUpdateItem(this.props.index + amount);
  }

  render() {
    return (
      <div className='carouselComponent'>
        <button className='leftButton' onClick={() => this.handleClick(-1)}>Left</button>
          <TransitionGroup className={this.state.isLeft ? 'carousel-left' : 'carousel-right'}>
            {this.props.children.map((child, index) => index === this.state.current && (
              <CSSTransition key={index} timeout={500} classNames='switch'>
                {child}
              </CSSTransition>
            ))}
          </TransitionGroup>
        <button className='rightButton' onClick={() => this.handleClick(1)}>Right</button>
      </div>
    )
  }
} 

class App extends Component {
  state = {
    index: 0,
  };

  updateIndex = (index) => {
    this.setState({index});
  }

  render() {
    return (
      <div className='App'>
        <CarouselComponent onUpdateItem={this.updateIndex} index={this.state.index}>
          <CarouselElement style={{backgroundColor: '#E9573F'}} />
          <CarouselElement style={{backgroundColor: '#00B1E1'}} />
          <CarouselElement style={{backgroundColor: '#8CC152'}} />
        </CarouselComponent>
      </div>
    );
  }
}

export default App;
