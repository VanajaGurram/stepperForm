import logo from './logo.svg';
import './App.css';
import './store'
import { Provider } from 'react-redux';
import ReduxApp from './ReduxApp';
import { store } from './ReduxTopic/Store/store';
import Component from './ReduxTopic/Component';
import StepperWithRedux from './ReduxTopic/StepperWithRedux';
import ApiData from './ReduxTopic/ApiData';
import RenderingComponent1 from './ReduxTopic/RenderingComponent1';
import StepperForm from './ReduxTopic/StepperForm';
// import { store } from './store';

function App() {
  return (  
    <div className="App">
     <h1>redux</h1>
  {/* <Provider store={store}>
    <ReduxApp/>
  </Provider> */}
  <Provider store={store}> 
   {/* <Component/> */}
   {/* <StepperWithRedux/> */}
   {/* <ApiData/> */}
   {/* <RenderingComponent1/> */}
   <StepperForm/>
  </Provider>
  
 
  
    </div>
  );
}

export default App;
