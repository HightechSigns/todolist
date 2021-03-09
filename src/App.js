import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TodoList from "./pages/TodoList";
import Dexie from 'dexie';


function App() {
  return (
    <Router>
       <Switch>
          <Route path="/">
          <TodoList db={new Dexie('TodoList')}/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
