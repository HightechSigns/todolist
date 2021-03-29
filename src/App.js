import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import TodoList from "./pages/TodoList";
function App() {
  return (
    <Router>
       <Switch>
          <Route path="/">
          <TodoList/>
          </Route>
        </Switch>
    </Router>
  );
}
export default App;
