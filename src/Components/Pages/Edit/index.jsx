import React, { useContext, useEffect, useState, useRef } from "react";
import firebase, { storage } from "../../libs/firebase";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utility/AuthService";

//style
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";
import { FontStyle } from "../../libs/Snippets";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

//components
import { TagsList } from "../../utility/TagsList";
import { ModalTagChoice } from "../../utility/ModalTagChoice";
import { ModalCropper } from "./Components/ModalCropper";
import { Button } from "../../utility/Button/Button";

export const FCEdit = ({ history, className }) => {
  const did = useParams().id;
  const user = useContext(AuthContext);
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(user.uid);
  const DefaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/teamb-d552c.appspot.com/o/imageDefault.png?alt=media&token=13e5f695-a9b8-49b3-84af-272202e0c0b4";
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
        .ref("drinkImages")
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
      <section className={className}>
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
        <form className={`${className}__form`}>
          <div>
            <span>
              <img
                src={previewImage}
                onClick={() => inputImageRef.current.click()}
                height={200}
                alt="画像プレビュー"
              />
            </span>
            <span className={`${className}__form_icon`}>
              <AddCircleIcon />
            </span>
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
            <Rating
              className={`${className}__form_rating`}
              name="simple-controlled"
              value={rate}
              onChange={(e, newRate) => {
                setRate(newRate);
              }}
            />
          </div>

          {choiceTagArray && choiceTagArray.length >= 1 && (
            <div className={`${className}__form_tagList`}>
              <TagsList tags={choiceTagArray} />
            </div>
          )}

          <div className={`${className}__button`}>
            <Button
              label="タグを追加"
              long="long"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setOpenModalTagChoice(true);
                setNewTagInput(true);
              }}
            />
          </div>

          <div>
            <input
              className={`${className}__input`}
              type="name"
              name="name"
              value={nameText}
              placeholder="お酒の名前"
              onChange={(e) => {
                setNameText(e.target.value);
              }}
            />
          </div>

          <div className={`${className}__calendar`}>
            <DatePicker
              className={`${className}__datePicker`}
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
          </div>

          <div>
            <textarea
              className={`${className}__input ${className}__textarea`}
              rows="10"
              cols="40"
              placeholder="メモ"
              value={memo}
              onChange={(e) => {
                setMemo(e.target.value);
              }}
            />
            <div className={`${className}__button`}>
              <Button long="long" label="保存" onClick={handleSubmit} />
            </div>
          </div>
        </form>
      </section>
    </MuiPickersUtilsProvider>
  );
};

export const Edit = styled(FCEdit)`
  &__form {
    background-color: #000;
    color: #fff;
    margin: 46px 0 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      position: relative;
    }
    img {
      width: 225px;
      height: 225px;
      border-radius: 37px;
      filter: brightness(75%);
    }
  }

  &__form_icon {
    position: absolute;
    top: 42.5%;
    left: 40%;
    z-index: 1;
    :before {
      content: "";
      background-color: #fff;
      height: 30px;
      width: 30px;
      position: absolute;
      border-radius: 50%;
      top: 9px;
      left: 10px;
      z-index: -1;
      filter: drop-shadow(1px 4px 4px rgba(0, 0, 0, 0.4));
    }
    .MuiSvgIcon-root {
      color: #000;
      border-radius: 50%;
      height: 45px;
      width: 45px;
    }
  }

  &__form_rating {
    margin-top: 43px;
    font-size: 38px;
    .MuiRating-icon {
      margin-right: 3px;
    }
    .MuiRating-iconFilled {
      color: #ac966f;
    }
    .MuiRating-iconEmpty {
      color: #414040;
    }
  }

  &__form_tagList {
    margin-top: 43px;
  }

  &__button {
    margin-top: 43px;
  }

  &__input {
    font: normal normal normal 14px/24px Hiragino Sans;
    letter-spacing: 1.4px;
    width: 302px;
    height: 41px;
    margin-top: 29.5px;
    padding: 13.5px 0 13.5px 7.5px;
    ::placeholder {
      font: normal normal normal 14px/24px Hiragino Sans;
      color: #5c5a5a;
    }
  }

  &__textarea {
    height: 300px;
  }

  &__calendar {
    position: relative;
    .MuiSvgIcon-root {
      position: absolute;
      bottom: 12px;
      right: 7.5px;
      color: #a8a6a6;
      font-size: 20px;
    }
  }

  &__datePicker {
    width: 302px;
    height: 27.5px;
    margin-top: 43px;
    border-bottom: 1px solid #707070;
    .MuiInputBase-root {
      input {
        ${FontStyle}
        font-size: 14px;
        letter-spacing: 2.1px;
        color: #fff;
        padding: 0 0 13.5px 7.5px;
      }
    }
    .MuiSvgIcon-root {
      color: #fff;
    }
  }
`;
