import { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../utility/AuthService";
import styled from "styled-components";

import { Button } from "../../utility/Button/Button";
import { SwiperComponent } from "./Components/SwiperComponent";

export const FCHome = ({ className }) => {
  const user = useContext(AuthContext);
  if (user) {
    return <Redirect to={`/user/${user.uid}`} />;
  }
  return (
    <section className={className}>
      <SwiperComponent />
      <Link to="/login">
        <Button long="long" label="無料で始める" />
      </Link>
    </section>
  );
};

export const Home = styled(FCHome)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 388px;
  margin: 60px 0 0;
`;
