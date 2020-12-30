// @ts-nocheck
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Layout from './pages/Layout';
import { ipcRenderer } from 'electron';
import store from './store';
import swal from 'sweetalert';
import SingleTest from './pages/SingleTest';

const CypressValidation = (props) => {
  if(props.cypressRequire) {
    return (
      <div className="bg-red-400 text-gray-50 px-3 flex justify-between">
        <span>Cypress is missing in your system!</span>
        <a href="#" onClick={props.handleInstall} className="text-green-800">Automatic install</a>
      </div>
    )
  }

  return <div className="bg-green-600 text-gray-50 px-3">
    <span>Cypress was installed!</span>
  </div>
}

const Hello = () => {
  const [cypress, setCypress] = useState(store.get('cypressState'))
  const [loading, setLoading] = useState(false)

  ipcRenderer.on('cypress', (_, payload) => {
    setCypress(payload);
  })

  ipcRenderer.on('cypress-installed', (_, payload) => {
    setLoading(false)
    if(payload) {
      store.set('cypressState', false)
      setCypress(false)
    }
  })

  const handleInstall = () => {
    setLoading(true)
    ipcRenderer.send(cypress.key)
  }

  const testCreateSingleTest = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 5000)
    ipcRenderer.send('test')
  }

  return (
    <Layout loading={loading}>
      <CypressValidation cypressRequire={!!cypress} handleInstall={handleInstall}/>

      <button onClick={testCreateSingleTest}>Test</button>
      <div className="grid grid-cols-3 gap-6 mt-4">
        <div className="bg-gray-300 py-4 text-center cursor-pointer card">
          <Link to="/single-test">Single test</Link>
        </div>
        <div className="bg-gray-300 py-4 text-center cursor-pointer card">2</div>
        <div className="bg-gray-300 py-4 text-center cursor-pointer card">3</div>
        <div className="bg-gray-300 py-4 text-center cursor-pointer card">4</div>
      </div>
    </Layout>
  );
};

export default function App() {
  ipcRenderer.send('check-requirements');
  ipcRenderer.on('notification', (_, { type = 'success', title = 'Alert', message }) => {
    swal({
      icon: type,
      title,
      text: message
    })
  })

  return (
    <Router>
      <Switch>
        <Route path="/single-test" exact component={SingleTest} />
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
