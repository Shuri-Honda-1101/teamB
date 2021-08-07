import React, { useContext, useEffect, useState, useRef } from "react";
import TagsList from "../../utility/TagsList";
import firebase, { storage } from "../../../config/firebase";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utility/AuthService";
import ModalTagChoice from "../../utility/ModalTagChoice";
import ModalCropper from "./Components/ModalCropper";
import Header from "../../utility/Header";
import Footer from "../../utility/Footer";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";
import ModalItemChoice from "../../utility/ModalItemChoice";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { FontStyle } from "../../utility/Snippets";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import "date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Edit = ({ history }) => {
  const did = useParams().id;
  const user = useContext(AuthContext);
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(user.uid);
  const DefaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/teamb-d552c.appspot.com/o/imageDefault.png?alt=media&token=13e5f695-a9b8-49b3-84af-272202e0c0b4";
  const [openModalItemChoice, setOpenModalItemChoice] = useState(false);
  const [selectImageValue, setSelectImageValue] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const inputImageRef = useRef(null);
  const [rate, setRate] = useState(3);
  const [previewImage, setPreviewImage] = useState(DefaultImageUrl);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [memo, setMemo] = useState("");
  const [nameText, setNameText] = useState("");
  const [openModalTagChoice, setOpenModalTagChoice] = useState(false);
  const [choiceTagArray, setChoiceTagArray] = useState(null);
  const [newTagInput, setNewTagInput] = useState(false);

  //did !== undefined つまり、お酒のIDが存在する時は初期値を与える処理
  useEffect(() => {
    if (did === undefined) {
      return;
    } else {
      const userRef = db.collection("users").doc(user.uid);
      const drinkDB = userRef.collection("drinks").doc(did);
      drinkDB.onSnapshot((doc) => {
        const drink = { ...doc.data(), id: doc.id };
        setPreviewImage(drink.image);
        setRate(drink.rate);
        setNameText(drink.drink);
        setChoiceTagArray(drink.tags);
      });
    }
  }, [db, did, user.uid]);

  //画像選択時の処理
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageUrl(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  //firestoreアップデートの関数
  const updateDrink = (url) =>
    userRef
      .collection("drinks")
      .doc(did)
      .update({
        tags: choiceTagArray,
        image: url,
        drink: nameText,
        rate: rate,
        dates: firebase.firestore.FieldValue.arrayUnion(selectedDate),
      })
      .then(() => {
        userRef
          .collection("drinks")
          .doc(did)
          .collection("memos")
          .add({
            date: selectedDate,
            memo: memo,
          })
          .then(() => {
            history.push(`/user/${user.uid}`);
          });
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });

  //firestore新規追加の関数
  const addDrink = (url) =>
    userRef
      .collection("drinks")
      .add({
        tags: choiceTagArray,
        image: url,
        drink: nameText,
        rate: rate,
        dates: [selectedDate],
      })
      .then((docRef) => {
        console.log("Document successfully written!");
        docRef
          .collection("memos")
          .add({
            date: selectedDate,
            memo: memo,
          })
          .then(() => {
            history.push(`/user/${user.uid}`);
          });
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });

  //Tagsコレクションに追加する関数
  const pushTags = async () => {
    const uidDB = firebase.firestore().collection("users").doc(user.uid);
    const allTagsGet = await uidDB.collection("tags").get();
    const allTags = await allTagsGet.docs.map((doc) => doc.data().tag);
    //既存のタグ一覧に今回追加するタグが存在しない場合のみ、タグ一覧に追加する
    choiceTagArray &&
      choiceTagArray.forEach((tag) => {
        if (allTags.includes(tag) !== true) {
          uidDB.collection("tags").add({
            tag: tag,
          });
        }
      });
  };

  //画像アップロード→各種docにデータを追加する関数
  const uploadImageAndDocData = () => {
    const next = (snapshot) => {
      const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percent + "% done");
      console.log(snapshot);
    };
    const error = (error) => {
      console.log(error);
    };
    const complete = () => {
      storage
        .ref("images")
        .child(croppedImage.name)
        .getDownloadURL()
        .then((firebaseUrl) => {
          pushTags();
          if (did) {
            updateDrink(firebaseUrl);
          } else {
            addDrink(firebaseUrl);
          }
        });
    };
    if (croppedImage) {
      //トリミング後の画像がある場合は、画像のアップロード→データのアップロード
      const uploadTask = storage
        .ref(`/drinkImages/${croppedImage.name}`)
        .put(croppedImage);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        next,
        error,
        complete
      );
    } else {
      //ない場合はそのままデフォルト画像でデータをアップロード
      pushTags();
      if (did) {
        updateDrink(previewImage);
      } else {
        addDrink(previewImage);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameText === "") {
      alert("保存に失敗しました。お酒の名前は必須入力欄です");
      return;
    } else {
      uploadImageAndDocData();
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <>
        <Header />
        {openModalItemChoice && (
          <ModalItemChoice
            setOpenModalItemChoice={setOpenModalItemChoice}
            history={history}
          />
        )}
        {imageUrl && (
          <ModalCropper
            setImageUrl={setImageUrl}
            setSelectImageValue={setSelectImageValue}
            imageUrl={imageUrl}
            setPreviewImage={setPreviewImage}
            setCroppedImage={setCroppedImage}
          />
        )}
        {openModalTagChoice && (
          <ModalTagChoice
            user={user}
            setOpenModalTagChoice={setOpenModalTagChoice}
            setChoiceTagArray={setChoiceTagArray}
            newTagInput={newTagInput}
          />
        )}
        <section>
          <SEditWrap onSubmit={handleSubmit}>
            <div>
              <span>
                <img
                  src={previewImage}
                  onClick={() => inputImageRef.current.click()}
                  height={200}
                  alt="画像プレビュー"
                />
              </span>
              <SAddIcon>
                <AddCircleIcon />
              </SAddIcon>
              <input
                hidden
                ref={inputImageRef}
                type="file"
                accept="image/*"
                value={selectImageValue}
                onChange={onSelectFile}
              />
            </div>

            <div>
              <SRating
                name="simple-controlled"
                value={rate}
                onChange={(e, newRate) => {
                  setRate(newRate);
                }}
              />
            </div>

            {choiceTagArray && choiceTagArray.length >= 1 && (
              <STagListWrap>
                <TagsList tags={choiceTagArray} />
              </STagListWrap>
            )}

            <div>
              <SButton
                type="button"
                onClick={() => {
                  setOpenModalTagChoice(true);
                  setNewTagInput(true);
                }}
              >
                タグを追加
              </SButton>
            </div>

            <div>
              <SInput
                type="name"
                name="name"
                value={nameText}
                placeholder="お酒の名前"
                onChange={(e) => {
                  setNameText(e.target.value);
                }}
              />
            </div>

            <SCalendarWrap>
              <SDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                value={selectedDate}
                onChange={(date) => {
                  //時刻があるとソートに支障が出るので、年月日のみに変更
                  const yyyy = date.getFullYear();
                  const mm = ("0" + (date.getMonth() + 1)).slice(-2);
                  const dd = ("0" + date.getDate()).slice(-2);
                  const YMD = new Date(`${yyyy}-${mm}-${dd}`);
                  setSelectedDate(YMD);
                }}
              />
              <span>
                <CalendarTodayIcon />
              </span>
            </SCalendarWrap>

            <div>
              <STextarea
                rows="10"
                cols="40"
                placeholder="メモ"
                value={memo}
                onChange={(e) => {
                  setMemo(e.target.value);
                }}
              />
              <div>
                <SButton type="submit">保存</SButton>
              </div>
            </div>
          </SEditWrap>
        </section>
        <Footer
          setOpenModalItemChoice={setOpenModalItemChoice}
          history={history}
        />
      </>
    </MuiPickersUtilsProvider>
  );
};

const SEditWrap = styled.form`
  background-color: #000;
  color: #fff;
  margin-top: calc(46 / 375 * 100vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  img {
    width: calc(225 / 375 * 100vw);
    height: calc(225 / 375 * 100vw);
    border-radius: calc(37 / 375 * 100vw);
    filter: brightness(75%);
  }
`;

const SAddIcon = styled.span`
  position: absolute;
  top: calc(92 / 375 * 100vw);
  left: calc(165 / 375 * 100vw);
  z-index: 1;
  :before {
    content: "";
    background-color: #fff;
    height: calc(30 / 375 * 100vw);
    width: calc(30 / 375 * 100vw);
    position: absolute;
    border-radius: 50%;
    top: calc(9 / 375 * 100vw);
    left: calc(10 / 375 * 100vw);
    z-index: -1;
    filter: drop-shadow(
      calc(1 / 375 * 100vw) calc(4 / 375 * 100vw) calc(4 / 375 * 100vw)
        rgba(0, 0, 0, 0.4)
    );
  }
  .MuiSvgIcon-root {
    color: #000;
    border-radius: 50%;
    height: calc(45 / 375 * 100vw);
    width: calc(45 / 375 * 100vw);
  }
`;

const SRating = styled(Rating)`
  margin-top: calc(43 / 375 * 100vw);
  font-size: calc(38 / 375 * 100vw);
  .MuiRating-icon {
    margin-right: calc(3 / 375 * 100vw);
  }
  .MuiRating-iconFilled {
    color: #ac966f;
  }
  .MuiRating-iconEmpty {
    color: #414040;
  }
`;

const STagListWrap = styled.div`
  margin-top: calc(43 / 375 * 100vw);
`;

const SButton = styled.button`
  background-color: #212121;
  color: #ffffff;
  border: none;
  border-radius: calc(10 / 375 * 100vw);
  width: calc(302 / 375 * 100vw);
  height: calc(37 / 375 * 100vw);
  margin-top: calc(43 / 375 * 100vw);
  line-height: calc(37 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
  letter-spacing: calc(4.2 / 375 * 100vw);
  ${FontStyle}
  font-weight: 100;
  :hover {
    border: 1px solid #fff;
    background-color: #414040;
  }
`;

const SInput = styled.input`
  ${FontStyle}
  font-size: calc(14 / 375 * 100vw);
  letter-spacing: calc(1.4 / 375 * 100vw);
  width: calc(302 / 375 * 100vw);
  height: calc(41 / 375 * 100vw);
  margin-top: calc(29.5 / 375 * 100vw);
  padding: calc(13.5 / 375 * 100vw) 0 calc(13.5 / 375 * 100vw)
    calc(7.5 / 375 * 100vw);
  ::placeholder {
    ${FontStyle}
    color: #5c5a5a;
  }
`;

const SCalendarWrap = styled.div`
  position: relative;
  .MuiSvgIcon-root {
    position: absolute;
    bottom: calc(12 / 375 * 100vw);
    right: calc(7.5 / 375 * 100vw);
    color: #a8a6a6;
    font-size: calc(20 / 375 * 100vw);
  }
`;

const STextarea = styled(SInput.withComponent("textarea"))`
  height: calc(300 / 375 * 100vw);
`;

const SDatePicker = styled(DatePicker)`
  width: calc(302 / 375 * 100vw);
  height: calc(27.5 / 375 * 100vw);
  margin-top: calc(43 / 375 * 100vw);
  border-bottom: 1px solid #707070;
  .MuiInputBase-root {
    input {
      ${FontStyle}
      font-size: calc(14 / 375 * 100vw);
      letter-spacing: calc(2.1 / 375 * 100vw);
      color: #fff;
      padding: 0 0 calc(13.5 / 375 * 100vw) calc(7.5 / 375 * 100vw);
    }
  }
  .MuiSvgIcon-root {
    color: #fff;
  }
`;

export default Edit;
