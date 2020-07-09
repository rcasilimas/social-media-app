import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {persistor, store} from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import { PersistGate } from 'redux-persist/integration/react';
import 'tachyons';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
                <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
