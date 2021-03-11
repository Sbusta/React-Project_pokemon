import './App.css';
import Navbar from './components/navbar'
import PkList from './components/list_pokemon'
import PkDetails from './components/pk_details'
import { Provider } from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'
import store from './store'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store} >
        <Navbar/>
        <Route path='/' exact>
            <Welcome></Welcome>
        </Route>

        <Route path='/pokemons' exact>
        
          <PkList/>
          <PkDetails/>
          <PkCompare/>
        </Route>
      
      </Provider>
    </BrowserRouter>
  );
}

export default App;
