import { useState } from "react";
import styled from "styled-components";

import firebase from "../../libs/firebase";

//components
import { ModalUpdateEmail } from "./Components/ModalUpdateEmail";
import { ModalUpdatePassword } from "./Components/ModalUpdatePassword";
import { TagListEdit } from "./Components/TagListEdit";

export const FCConfig = ({ history, className }) => {
  const [openModalUpdateEmail, setOpenModalUpdateEmail] = useState(false);
  const [openModalUpdatePassword, setOpenModalUpdatePassword] = useState(false);
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
    <div className={className}>
      {openModalUpdateEmail && (
        <ModalUpdateEmail setOpen={setOpenModalUpdateEmail} />
      )}
      {openModalUpdatePassword && (
        <ModalUpdatePassword setOpen={setOpenModalUpdatePassword} />
      )}
      <section className={`${className}__content`}>
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
      </section>
    </div>
  );
};

export const Config = styled(FCConfig)``;
