import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux';
import Worker from "./components/Worker";
import Form from "./components/Form";

const App = () => (
    <Provider store={store}>
        <div className="row">
            <Worker />
            <Form />
        </div>
    </Provider>
);

export default App;
