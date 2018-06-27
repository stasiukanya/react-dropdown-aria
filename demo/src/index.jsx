import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from '../../src/Dropdown';
import './index.scss';

const options = [
  { name: 'React', className: 'test' },
  { name: 'Angular' },
  { name: 'Vue' },
  { name: 'Elm' },
  { name: 'Go', className: 'test' },
  { name: 'Ruby' },
  { name: 'C++' },
  { name: 'Python' },
];

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interest: null,
      disabled: false,
    };
  }

  setInterest = selectedOption => {
    this.setState({ interest: selectedOption, interestError: false });
  }

  render() {
    const buttonText = this.state.status === 'submitting' ? 'Submitting ...' : 'Sign up now';
    const disabled = this.state.status === 'submitting';

    return (
      <Dropdown
        placeholder='Framework of Choice?'
        className='my-dropdown'
        options={ options }
        selectedOption={ this.state.interest }
        setSelected={ this.setInterest }
        disabled={ this.state.disabled }
        width={200}
        maxContentHeight={150} />
    );
  }
};

ReactDOM.render(<Demo />, document.getElementById("root"));