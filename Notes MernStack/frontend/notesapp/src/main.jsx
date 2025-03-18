import React from 'react'
import ReactDOM from 'react-dom/client'
import {FluentProvider,webLightTheme} from '@fluentui/react-components'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <FluentProvider theme={webLightTheme}>
    <App />
  </FluentProvider>,
)
