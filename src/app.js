import React from 'react';
import ReactDOM from 'react-dom';

import StepOne from './stepOne';
import StepTwo from './stepTwo';

import StepThree from './stepThree';

class App extends React.Component {
  render() {
    return <div>
        先热热身吧
        <StepOne />
        那么，如何优化？
        <StepTwo />
         那么，对于复杂对象怎么比较，才能既简单又高效？
         （有时候复杂对象比较的开销甚至超过了render时间，得不偿失）
         <StepThree />
      </div>;
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('container')
);