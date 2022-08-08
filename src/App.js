import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
const code = new URLSearchParams(window.location.search).get("code");
//returns anything return after the url
function App() {
  return code ? <Dashboard code={code}/> : <Login/>;
}

export default App;
