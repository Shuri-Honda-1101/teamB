import { useRef } from "react";
import styled from "styled-components";

const ModalForgetPassword = ({
  setOpenModalForgetPassword,
  resetPasswordEmail,
  setResetPasswordEmail,
  onClickResetPasswordSubmit,
}) => {
  const modalRef = useRef(null);
  return (
    <>
      <SModalWrap
        onClick={(e) => {
          if (modalRef.current.contains(e.target)) return;
          setOpenModalForgetPassword(false);
          setResetPasswordEmail("");
        }}
      >
        <SModalInner ref={modalRef}>
          <SMailForm>
            <STitle>パスワード再設定メールを送信する</STitle>
            <SInput
              type="email"
              id="email"
              name="email"
              value={resetPasswordEmail}
              placeholder="メールアドレス"
              onChange={(e) => setResetPasswordEmail(e.target.value)}
            />
            <SButton type="submit" onClick={onClickResetPasswordSubmit}>
              OK
            </SButton>
          </SMailForm>
        </SModalInner>
      </SModalWrap>
    </>
  );
};

const SModalWrap = styled.section`
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
`;

const SModalInner = styled.div`
  background-color: #000;
  height: calc(274 / 375 * 100vw);
  width: calc(315 / 375 * 100vw);
  border-radius: calc(31 / 375 * 100vw);
  border: 1px solid #ac966f;
  padding: 63px 0 59px 0;
`;

const SMailForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const STitle = styled.h1`
  font-size: calc(13 / 375 * 100vw);
  letter-spacing: calc(1.3 / 375 * 100vw);
`;
const SInput = styled.input`
  width: calc(237 / 375 * 100vw);
  padding-bottom: calc(13.5 / 375 * 100vw);
  margin: calc(37 / 375 * 100vw);
  ::placeholder {
    color: #5c5a5a;
    font-size: 14px;
    letter-spacing: 1.4px;
    padding-left: calc(7.2 / 375 * 100vw);
  }
`;
const SButton = styled.button`
  display: block;
  margin: 0 auto;
  background-color: #212121;
  color: #ffffff;
  border: none;
  border-radius: calc(10 / 375 * 100vw);
  width: calc(237 / 375 * 100vw);
  height: calc(37 / 375 * 100vw);
  letter-spacing: calc(1.3 / 375 * 100vw);
`;

export default ModalForgetPassword;
