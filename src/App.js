import './App.css';
import Navbar from './components/navbar'
import PkList from './components/list_pokemon'
import PkDetails from './components/pk_details'
import PkCompare from './components/pk_compare'
import Home from './components/home';
import { Provider } from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'
import store from './store'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store} >
        <Navbar/>
        <Route path='/' exact>
            <Home></Home>
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
