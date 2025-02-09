import {Link} from "react-router-dom";
import PageNav from "../components/PageNav.jsx";

function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>Worldwise</h1>

      <Link to='/app'>App</Link>
    </div>
  )
}

export default Homepage