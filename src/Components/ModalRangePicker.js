import "react-dates/initialize";
import { DayPickerRangeController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/ja"; // 日本語ローカライズ
import moment from "moment";
import styled from "styled-components";

const ModalRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  focusedInput,
  setFocusedInput,
  setOpenModalRangePicker,
}) => {
  return (
    <SModalWrap>
      <SModalInner>
        <DayPickerRangeController
          startDate={startDate}
          endDate={endDate}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => {
            setFocusedInput(!focusedInput ? "startDate" : focusedInput);
          }}
          onDatesChange={(selectedDates) => {
            if (focusedInput === "startDate") {
              setStartDate(selectedDates.startDate);
            } else {
              setEndDate(selectedDates.endDate);
            }
          }}
        />
        <button onClick={() => setOpenModalRangePicker(false)}>OK</button>
      </SModalInner>
    </SModalWrap>
  );
};

const SModalWrap = styled.section`
  z-index: 1;
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

export default ModalRangePicker;
