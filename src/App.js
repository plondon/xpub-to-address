import React, { Component } from 'react'
import Bitcoin from 'bitcoinjs-lib'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = { status: null, addresses: {} }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const xpub = document.getElementById('xpub').value
    const start = Number(document.getElementById('start').value) || 0
    const end = Number(document.getElementById('end').value) || 50
    if (!xpub) { window.alert('invalid input'); return }
    if (start > end) { window.alert('start cannot be greater than end'); return }

    const node = Bitcoin.HDNode.fromBase58(xpub)
    const addresses = {}
    this.setState({ status: null, addresses })
    for (var i = start; i <= end; i++) { addresses[i] = node.derive(0).derive(i).getAddress(); }
    debugger
    this.setState({ status: 'ready', addresses })
  }

  render () {
    const { status, addresses } = this.state

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className='formItem'>
            <label for='xpub'>Feed Me Xpub: </label>
            <input type='text' name='xpub' id='xpub' style={{width: '740px'}} />
          </div>
          <br />
          <br />
          <div className='formItem'>
            <label for='start'>Start Index (Default 0): </label>
            <input type='number' name='start' id='start' />
          </div>
          <br />
          <div className='formItem'>
            <label for='end'>End Index (Default 50): </label>
            <input type='number' name='end' id='end' />
          </div>
          <input type='submit' value='submit' />
        </form>
        { Object.keys(addresses).length ? status === 'ready' ? Object.keys(addresses).map((i) => {
          return (<ol>{i}. {addresses[i]}</ol>)
        }) : <h2>Working!!</h2> : null }
      </React.Fragment>
    )
  }
}

export default App
