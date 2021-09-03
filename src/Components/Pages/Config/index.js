import Footer from "../../utility/Footer";
import Header from "../../utility/Header";
import firebase from "../../../config/firebase";
import { useState } from "react";
import ModalUpdateEmail from "./Components/ModalUpdateEmail";
import ModalUpdatePassword from "./Components/ModalUpdatePassword";
import ModalItemChoice from "../../utility/ModalItemChoice";
import { TagListEdit } from "./Components/TagListEdit";

const Config = ({ history }) => {
  const [openModalUpdateEmail, setOpenModalUpdateEmail] = useState(false);
  const [openModalUpdatePassword, setOpenModalUpdatePassword] = useState(false);
  const [openModalItemChoice, setOpenModalItemChoice] = useState(false);
  const [openTagListEdit, setOpenTagListEdit] = useState(false);

  //ログアウト処理
  const onClickLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => history.push("/login"))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      {openModalItemChoice && (
        <ModalItemChoice
          setOpenModalItemChoice={setOpenModalItemChoice}
          history={history}
        />
      )}
      {openModalUpdateEmail && (
        <ModalUpdateEmail setOpen={setOpenModalUpdateEmail} />
      )}
      {openModalUpdatePassword && (
        <ModalUpdatePassword setOpen={setOpenModalUpdatePassword} />
      )}
      {openTagListEdit || (
        <div>
          <h1>Configページ</h1>
          <button
            onClick={() => {
              setOpenModalUpdatePassword(true);
            }}
          >
            パスワード変更
          </button>
          <button
            onClick={() => {
              setOpenModalUpdateEmail(true);
            }}
          >
            メールアドレス変更
          </button>
          <button
            onClick={() => {
              setOpenTagListEdit(true);
            }}
          >
            タグリスト編集
          </button>
          <button onClick={onClickLogout}>ログアウト</button>
        </div>
      )}
      {openTagListEdit && <TagListEdit setOpen={setOpenTagListEdit} />}
      <Footer
        setOpenModalItemChoice={setOpenModalItemChoice}
        history={history}
      />
    </>
  );
};

export default Config;
