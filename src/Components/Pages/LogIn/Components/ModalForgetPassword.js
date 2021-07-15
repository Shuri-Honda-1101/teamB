import styled from "styled-components";

const ModalForgetPassword = ({
  setOpenModalForgetPassword,
  resetPasswordEmail,
  setResetPasswordEmail,
  onClickResetPasswordSubmit,
}) => {
  return (
    <>
      <SModalWrap>
        <SModalInner>
          <h1>パスワードの再設定</h1>
          <form>
            <input
              type="email"
              id="email"
              name="email"
              value={resetPasswordEmail}
              placeholder="メールアドレス"
              onChange={(e) => setResetPasswordEmail(e.target.value)}
            />
            <button type="submit" onClick={onClickResetPasswordSubmit}>
              OK
            </button>
          </form>
          <button
            onClick={() => {
              setOpenModalForgetPassword(false);
              setResetPasswordEmail("");
            }}
          >
            閉じる
          </button>
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
  background-color: #fffffe;
  width: calc(1500 / 1920 * 100vw);
  height: calc(1900 / 1920 * 100vw);
  border-radius: calc(65 / 1920 * 100vw);
`;

export default ModalForgetPassword;
