import './App.css';
import Navbar from './components/navbar'
import pkList from './components/list_pokemon'
import pkDetails from './components/pk_details'
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
        
          <pkList/>
          <pkDetails/>
          <pkCompare/>
        </Route>
      
      </Provider>
    </BrowserRouter>
  );
}

export default App;
