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
      rules: "[\n\t{\n\t\t\"name\": \"transaction minimum 500\",\n\t\t\"priority\": 3,\n\t\t\"on\": true,\n\t\t\"condition\": function(R) {\n\t\t\tR.when(this.transactionTotal < 500);\n\t\t},\n\t\t\"consequence\": function(R) {\n\t\t\tthis.result = false;\n\t\t\tR.stop();\n\t\t}\n\t},\n\t{\n\t\t\"name\": \"high credibility customer - avoid checks and bypass\",\n\t\t\"priority\": 2,\n\t\t\"on\": true,\n\t\t\"condition\": function(R) {\n\t\t\tR.when(this.userCredibility && this.userCredibility > 5);\n\t\t},\n\t\t\"consequence\": function(R) {\n\t\t\tthis.result = true;\n\t\t\tR.stop();\n\t\t}\n\t},\n\t{\n\t\t\"name\": \"block AME > 10000\",\n\t\t\"priority\": 4,\n\t\t\"on\": true,\n\t\t\"condition\": function(R) {\n\t\t\tR.when(this.cardType == \"Credit Card\" && this.cardIssuer == \"American Express\" && this.transactionTotal > 1000);\n\t\t},\n\t\t\"consequence\": function(R) {\n\t\t\tthis.result = false;\n\t\t\tR.stop();\n\t\t}\n\t},\n\t{\n\t\t\"name\": \"block Cashcard Payment\",\n\t\t\"priority\": 8,\n\t\t\"on\": true,\n\t\t\"condition\": function(R) {\n\t\t\tR.when(this.cardType == \"Cash Card\");\n\t\t},\n\t\t\"consequence\": function(R) {\n\t\t\tthis.result = false;\n\t\t\tR.stop();\n\t\t}\n\t},\n\t{\n\t\t\"name\": \"block guest payment above 10000\",\n\t\t\"priority\": 6,\n\t\t\"on\": true,\n\t\t\"condition\": function(R) {\n\t\t\tR.when(this.customerType && this.transactionTotal > 10000 && this.customerType == \"guest\");\n\t\t},\n\t\t\"consequence\": function(R) {\n\t\t\tconsole.log(\"Rule 5 matched - reject if above 10000 and customer type is guest. Rejecting payment.\");\n\t\t\tthis.result = false;\n\t\t\tR.stop();\n\t\t}\n\t},\n\t{\n\t\t\"name\": \"is customer guest?\",\n\t\t\"priority\": 7,\n\t\t\"on\": true,\n\t\t\"condition\": function(R) {\n\t\t\tR.when(!this.userLoggedIn);\n\t\t},\n\t\t\"consequence\": function(R) {\n\t\t\tthis.customerType = \"guest\";\n\t\t\tR.next(); // the fact has been altered, so all rules will run again. No need to restart.\n\t\t}\n\t},\n\t{\n\t\t\"name\": \"block payment from specific app\",\n\t\t\"priority\": 5,\n\t\t\"on\": true,\n\t\t\"condition\": function(R) {\n\t\t\tR.when(this.appCode && this.appCode === \"MOBI4\");\n\t\t},\n\t\t\"consequence\": function(R) {\n\t\t\tconsole.log(\"Rule 7 matched - block payment for Mobile. Reject Payment.\");\n\t\t\tthis.result = false;\n\t\t\tR.stop();\n\t\t}\n\t},\n\t{\n\t\t\"name\": \"event risk score\",\n\t\t\"priority\": 2,\n\t\t\"on\": true,\n\t\t\"condition\": function(R) {\n\t\t\tR.when(this.eventRiskFactor && this.eventRiskFactor < 5);\n\t\t},\n\t\t\"consequence\": function(R) {\n\t\t\tthis.result = true;\n\t\t\tR.stop();\n\t\t}\n\t},\n\t{\n\t\t\"name\": \"block ip range set\",\n\t\t\"priority\": 3,\n\t\t\"on\": true,\n\t\t\"condition\": function(R) {\n\t\t\tvar ipList = [\"10.X.X.X\", \"12.122.X.X\", \"12.211.X.X\", \"64.X.X.X\", \"64.23.X.X\", \"74.23.211.92\"];\n\t\t\tvar allowedRegexp = new RegExp('^(?:' + ipList.join('|').replace(/\\./g, '\\\\.').replace(/X/g, '[^.]+') + ')$');\n\t\t\tR.when(this.userIP && this.userIP.match(allowedRegexp));\n\t\t},\n\t\t\"consequence\": function(R) {\n\t\t\tthis.result = false;\n\t\t\tR.stop();\n\t\t}\n\t},\n\t{\n\t\t\"name\": \"check if user's name is blacklisted\",\n\t\t\"priority\": 1,\n\t\t\"on\": true,\n\t\t\"condition\": function(R) {\n\t\t\tvar blacklist = [\"user4\"];\n\t\t\tR.when(this && blacklist.indexOf(this.name) > -1);\n\t\t},\n\t\t\"consequence\": function(R) {\n\t\t\tthis.result = false;\n\t\t\tR.stop();\n\t\t}\n\t}\n]",
      fact: JSON.stringify({"userIP":"10.3.4.5","name":"user6","eventRiskFactor":8,"userCredibility":2,"appCode":"WEB1","userLoggedIn":true,"transactionTotal":500,"cardType":"Credit Card","cardIssuer":"VISA"}, null, 2),
      result: '',
      loading: false,
    };

    this.config = { mode: 'javascript', lineNumbers: true, tabSize: 2, indentWithTabs: true, };
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

    const { rules, fact } = this.state;

    fetch('/api/rules/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rules,
        fact: JSON.parse(fact),
      })
    })
      .then(r => {
        if (r.status >= 200 && r.status < 300)
          return r.json()

        return r.text()
          .then(t => ({
            data: `Failed HTTP code: ${r.status}\nResponse:\n\n${t}`,
          }));
      })
      .then(json => {
        this.setState({
          ...this.state,
          result: JSON.stringify(json.data, null, 2),
        });
      })
      .catch(err => console.log(err))
      .then(() => this.setState({
        ...this.state,
        loading: false,
      }));
  }

  render() {
    const { rules, fact } = this.state;
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
          Fact:
        </p>
        <CodeMirror value={fact} options={this.config} onChange={text => this.updateText('fact', text)}/>
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
