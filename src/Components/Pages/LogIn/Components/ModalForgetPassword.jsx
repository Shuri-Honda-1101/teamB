import { useRef } from "react";
import styled from "styled-components";
import { Button } from "../../../utility/Button/Button";

export const FCModalForgetPassword = ({
  setOpenModalForgetPassword,
  resetPasswordEmail,
  setResetPasswordEmail,
  onClickResetPasswordSubmit,
  className,
}) => {
  const modalRef = useRef(null);
  return (
    <section
      className={className}
      onClick={(e) => {
        if (modalRef.current.contains(e.target)) return;
        setOpenModalForgetPassword(false);
        setResetPasswordEmail("");
      }}
    >
      <div className={`${className}__inner`} ref={modalRef}>
        <form className={`${className}__form`}>
          <h1>パスワード再設定メールを送信する</h1>
          <input
            type="email"
            id="email"
            name="email"
            value={resetPasswordEmail}
            placeholder="メールアドレス"
            onChange={(e) => setResetPasswordEmail(e.target.value)}
          />
          <Button label="OK" onClick={onClickResetPasswordSubmit} />
        </form>
      </div>
    </section>
  );
};

export const ModalForgetPassword = styled(FCModalForgetPassword)`
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    background-color: #000;
    height: 274px;
    width: 315px;
    border-radius: 31px;
    border: 1px solid #ac966f;
    padding: 63px 0 59px 0;
  }

  &__form {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    h1 {
      font: normal normal normal 13px/23px Hiragino Sans;
      letter-spacing: 1.3px;
    }
    input {
      height: 27.5px;
      width: 237px;
      padding-bottom: 13.5px;
      ::placeholder {
        color: #5c5a5a;
        font-size: 14px;
        letter-spacing: 1.4px;
        padding-left: 7.2px;
      }
    }
  }
`;
