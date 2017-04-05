import React from 'react';
import V from 'react-render-visualizer-decorator';

const style ={
  border: '2px #333 solid',
  margin: '10px'
}
@V
class Child extends React.Component {
  render() {
    return <div style={style}>
      这里是第一层子节点
      child-{this.props.name}
      {this.props.xiaosan}
      <ChildOfChild name="狗" />
      </div>;
  }
}
@V
class ChildOfChild extends React.Component {
  render() {
    return <div style={style}>
      这里是第二层子节点
      ChildOfChild-{this.props.name}
      </div>;
  }
}

@V
class StepOne extends React.Component {
  constructor() {
    super();
    this.state = {
      xiaosan: ''
    }
  }
  changeXiaosan() {
    this.setState({
      xiaosan: '小伞你好'
    });
  }
  render() {
    return <div style={style}>
      这里是最外层父容器
      <button onClick={this.changeXiaosan.bind(this)}>改变”child-xiaosan“的props</button>
      <Child name="xiaoming" />
      <Child name="xiaohu" />
      <Child name="xiaosan" xiaosan={this.state.xiaosan} />
      <Child name="xiaojin" />
      </div>;
  }
}

module.exports = StepOne;