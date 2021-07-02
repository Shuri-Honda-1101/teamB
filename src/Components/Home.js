import { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthService";

const Home = () => {
  const user = useContext(AuthContext);
  if (user) {
    return <Redirect to={`/user/${user.uid}`} />;
  }
  return (
    <div>
      <h1>ここはHomeコンポーネントです</h1>
      <Link to="/login">無料で始める</Link>
    </div>
  );
};

export default Home;
