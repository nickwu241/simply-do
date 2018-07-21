import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { AppProvider } from '@shopify/polaris'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import store from './store'

ReactDOM.render(
  <AppProvider>
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  </AppProvider>,
  document.getElementById('root')
)
registerServiceWorker()
