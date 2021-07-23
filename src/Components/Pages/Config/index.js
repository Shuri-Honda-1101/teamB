import Footer from "../../utility/Footer";
import Header from "../../utility/Header";
import firebase from "../../../config/firebase";

const Config = ({ history }) => {
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
      <div>
        <h1>Configページ</h1>
        <button>パスワード変更</button>
        <button>メールアドレス変更</button>
        <button onClick={onClickLogout}>ログアウト</button>
      </div>
      <Footer />
    </>
  );
};

export default Config;
