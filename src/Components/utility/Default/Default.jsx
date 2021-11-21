import { useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "../AuthService";

//Components
import { Footer } from "../Footer/Footer";
import ModalItemChoice from "../ModalItemChoice";

//Pages
import { Catalog } from "../../Pages/Catalog";
import { Config } from "../../Pages/Config";
import { Edit } from "../../Pages/Edit";
import { Item } from "../../Pages/Item";

export const Default = ({ history }) => {
  const [openModalItemChoice, setOpenModalItemChoice] = useState(false);
  const user = useContext(AuthContext);
  return (
    <div>
      <main>
        {openModalItemChoice && (
          <ModalItemChoice
            setOpenModalItemChoice={setOpenModalItemChoice}
            history={history}
          />
        )}
        <Switch>
          <Route exact path="/user/:uid" component={Catalog} />
          <Route exact path="/new" component={Edit} />
          <Route exact path="/edit/:id" component={Edit} />
          <Route exact path="/edit/:id/:mid" component={Edit} />
          <Route exact path="/user/:uid/items/:did" component={Item} />
          <Route exact path="/config/:uid" component={Config} />
        </Switch>
      </main>
      <Footer setOpen={setOpenModalItemChoice} uid={user.uid} />
    </div>
  );
};
