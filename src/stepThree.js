import React from 'react';
import V from 'react-render-visualizer-decorator';
import Immutable from 'seamless-immutable';
import pureRender from 'pure-render-decorator';

const style ={
  border: '2px #333 solid',
  margin: '10px'
}

@V
@pureRender
class Child extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
     // 裸写下面这种写法没毛用，除非你的数据都是深拷贝，公用一个引用
     // 这种做法代价非常大，会使得你的代码变化莫测，非常非常难debug和维护
     // return nextProps.payload !== this.props.payload;
    /**
     *  写法一 如果组件属性很多，你就蛋疼了，而且性能难以保证。不推荐大组件使用
     *  而且每一个组件都必须要照搬着写这一坨代码
     *   return nextProps.payload.name !== this.props.payload.name
        || nextProps.payload.xiaosan !== this.props.payload.xiaosan;
     */

     // 写法二
    // 推荐写法
    // 我们不必实现SCU，程序智能实现，但是对你操作数据又一定要求，我这里使用的是轻量的seamless-immutable
    // 注释掉SCU看下效果
  // }
  render() {
    const { name, xiaosan } = this.props.payload;
    return <div style={style}>
      这里是第一层子节点
      child-{name}
      {xiaosan}
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
class StepThree extends React.Component {
  constructor() {
    super();
    this.state = {
      payload: {
          name: 'xiaosan',
          xiaosan: ''
      },
      payloadxiaohu: {
          name: 'xiaohu',
      },
      payloadxiaojin: {
          name: 'xiaojin',
      },
      payloadxiaoming: {
          name: 'xiaoming',
      }
    }
  }
  changeXiaosan() {
      /**
       *   对应SCU的写法一
       *     const payload = { ...this.state.payload };
                payload.xiaosan = '小伞你好'
                this.setState({
                    payload,
            });
       */
    // 对应SCU的写法二
    this.setState({
        payload: Immutable.set(Immutable(this.state.payload), 'xiaosan', '小伞你好')
    });
  }
  render() {
    return <div style={style}>
        这里是最外层父容器
        <button onClick={this.changeXiaosan.bind(this)}>改变”child-xiaosan“的props</button>
        <Child payload={this.state.payloadxiaohu} />
        <Child payload={this.state.payloadxiaojin} />
        <Child payload={this.state.payloadxiaoming}/> 
        <Child payload={this.state.payload} />
      </div>;
  }
}

module.exports = StepThree;