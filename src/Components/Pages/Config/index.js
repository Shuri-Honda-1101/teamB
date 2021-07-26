import Footer from "../../utility/Footer";
import Header from "../../utility/Header";
import firebase from "../../../config/firebase";
import { useState } from "react";
import ModalUpdateEmail from "./Components/ModalUpdateEmail";
import ModalUpdatePassword from "./Components/ModalUpdatePassword";

const Config = ({ history }) => {
  const [openModalUpdateEmail, setOpenModalUpdateEmail] = useState(false);
  const [openModalUpdatePassword, setOpenModalUpdatePassword] = useState(false);

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
      {openModalUpdateEmail && (
        <ModalUpdateEmail setOpen={setOpenModalUpdateEmail} />
      )}
      {openModalUpdatePassword && (
        <ModalUpdatePassword setOpen={setOpenModalUpdatePassword} />
      )}
      <div>
        <h1>Configページ</h1>
        <button>パスワード変更</button>
        <button
          onClick={() => {
            setOpenModalUpdateEmail(true);
          }}
        >
          メールアドレス変更
        </button>
        <button onClick={onClickLogout}>ログアウト</button>
      </div>
      <Footer />
    </>
  );
};

export default Config;
