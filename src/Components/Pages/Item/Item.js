// import { useContext } from "react";
import { useParams } from "react-router-dom";
// import { AuthContext } from "./AuthService";

const Item = () => {
  const drinkId = useParams().did;
  // const user = useContext(AuthContext);
  return (
    <div>
      <h1>ここはItems/{drinkId}コンポーネントです</h1>
    </div>
  );
};

export default Item;
