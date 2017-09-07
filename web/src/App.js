import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: '',
      facts: '',
      result: '',
      loading: false,
    };

    this.config = { mode: 'javascript', lineNumbers: true };
  }

  updateText(container, text) {
    this.setState({
      ...this.state,
      [container]: text,
    });
  }

  renderLoading() {
    return (
      <img src={loading} className="App-logo" alt="loading" />
    );
  }

  renderResult() {
    const { loading, result } = this.state;
    if (loading)
      return this.renderLoading();

    return (
      <CodeMirror value={result} options={{ ...this.config, readOnly: true }}/>
    );
  }

  runRules() {
    this.setState({
      ...this.state,
      loading: true,
    });

    const { rules, facts } = this.state;

    fetch('/api/rules/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rules,
        facts,
      })
    })
      .then(r => {
        if (r.status >= 200 && r.status < 300)
          r.json()

        return r.text()
          .then(t => ({
            result: `Failed HTTP code: ${r.status}\nResponse:\n\n${t}`,
          }));
      })
      .then(json => {
        this.setState({
          ...this.state,
          result: json.result,
        });
      })
      .catch(err => console.log(err))
      .then(() => this.setState({
        ...this.state,
        loading: false,
      }));
  }

  render() {
    const { rules, facts } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Rules:
        </p>
        <CodeMirror value={rules} options={this.config} onChange={text => this.updateText('rules', text)}/>
        <p className="App-intro">
          Facts:
        </p>
        <CodeMirror value={facts} options={this.config} onChange={text => this.updateText('facts', text)}/>
        <button onClick={() => this.runRules()}>Run</button>
        <p className="App-intro">
          Result:
        </p>
        { this.renderResult() }
      </div>
    );
  }
}

export default App;
