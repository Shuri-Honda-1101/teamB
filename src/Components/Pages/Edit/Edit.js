import React, { useContext, useState } from "react";
import TagsList from "../../utility/TagsList";
import firebase, { storage } from "../../../config/firebase";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utility/AuthService";
import ModalTagChoice from "../../utility/ModalTagChoice";
import ModalCropper from "./Components/ModalCropper";
import imageDefault from "../../../img/imageDefault.png";
import { useRef } from "react";
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
  const [openModalItemChoice, setOpenModalItemChoice] = useState(false);
  const [selectImageValue, setSelectImageValue] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const inputImageRef = useRef(null);
  //０レートは無いため、デフォルト値は3にしておきます。レンダリング時に、3にチェックが入っている必要があるため、inputタグにcheckedを追加します（本田）
  const [rate, setRate] = useState(did ? 5 : 3);
  //ここにプレビュー画像の初期値を入れます。存在する場合はその画像を、無い場合はimageDefaultを使うようにしてください
  const [previewImage, setPreviewImage] = useState(did ? null : imageDefault);
  const [croppedImage, setCroppedImage] = useState(null);

  //初期値を今日の日付にしておきます（本田）
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [memo, setMemo] = useState("");
  //お酒の名前入力の空欄防止に追加したstate（本田）
  const [nameText, setNameText] = useState("");
  const [openModalTagChoice, setOpenModalTagChoice] = useState(false);
  const [choiceTagArray, setChoiceTagArray] = useState(null);
  const [newTagInput, setNewTagInput] = useState(false);

  //今後のタスクで必要な処理です。（本田）
  //didがundefinedの時は新規作成、IDが入っている時はお酒の名前とレートのデフォルト入力をfirestoreから取ってきた値にして、保存時にアップデート処理をしてください（本田）
  // const {id} = useParams();

  // db.collection('users').get().then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, "=>", doc.data());
  //   })
  // })

  console.log(did);

  const user = useContext(AuthContext);
  const db = firebase.firestore();
  console.log(db);

  //画像をアップロード
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageUrl(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  console.log(choiceTagArray);

  const next = (snapshot) => {
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
    console.log(snapshot);
  };
  const error = (error) => {
    console.log(error);
  };

  const uploadImage = () => {
    if (previewImage === imageDefault) {
      alert("画像ファイルが選択されていません");
      return;
    }
    //croppedImage(トリミング画像)がnullかどうかで処理を分けてください
    const uploadTask = storage
      .ref(`/images/${croppedImage.name}`)
      .put(croppedImage);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };

  const complete = () => {
    storage
      .ref("images")
      .child(croppedImage.name)
      .getDownloadURL()
      .then((firebaseUrl) => {
        pushDrinks(firebaseUrl);
        pushTags();
      });
  };

  //Tagsコレクションに追加する処理
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

  const pushDrinks = (firebaseUrl) => {
    if (user !== null) {
      const userRef = db.collection("users").doc(user.uid);

      userRef
        .collection("drinks")
        .add({
          tags: choiceTagArray,
          image: firebaseUrl,
          drink: nameText,
          rate: rate,
          dates: [selectedDate],
        })
        .then((docRef) => {
          console.log("Document successfully written!");
          docRef
            .collection("memos")
            .add({
              //input dateのvalueはstring型なので、timestamp型に変換してsetします。
              // date: date,
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
    }
  };

  //rateのinputタグに入れました。（本田）
  // const handleRate = () => {};

  //メモを入力
  //メモは空欄でも大丈夫なので、メモinputタグにまとめました（本田）
  // const addMemo = () => {
  //   if (value === "") return;
  //   setMemo(value);
  // };

  //handleSubmitに処理を移動しました（本田）
  //お酒の名前を入力時に空欄を防止してnameにセットする処理
  // const drinkName = () => {
  //   //このままだと、空欄時になぜ保存されなかったかユーザーがわからない為、アラートを出します（本田）
  //   // if (value === "") return;
  //   if (nameText === "") {
  //     alert("保存に失敗しました。お酒の名前は必須入力欄です");
  //     return;
  //   }
  //   //ここもnameTextに変更します（本田）
  //   // setName(value);
  //   setName(nameText);
  // };

  //inputタグで処理を書くため不要（本田）
  // const addDate = () => {
  //   setDate(date);
  // };

  const handleSubmit = (e, firebaseUrl) => {
    const userRef = db.collection("users").doc(user.uid);
    e.preventDefault();
    if (did === undefined) {
      if (nameText === "") {
        alert("保存に失敗しました。お酒の名前は必須入力欄です");
        return;
      } else {
        // drinkName();
        uploadImage();
        //addMemoは不要になったので消します（本田）
        // addMemo();
        //こちらも不要なので消します（本田）
        // addDate()
      }
    } else {
      userRef
        .collection("drinks")
        .doc(did)
        .update({
          tags: choiceTagArray,
          image: firebaseUrl,
          drink: nameText,
          rate: rate,
          dates: [selectedDate],
        })
        .then((docRef) => {
          console.log("Document successfully written!");
          docRef
            .collection("memos")
            .add({
              //input dateのvalueはstring型なので、timestamp型に変換してsetします。
              // date: date,
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
                {/* imgタグはここに移動しました */}
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
              {/* <span>レーティング：</span> */}
              {/* onChangeを追加し、setRateします。 */}

              <SRating
                name="simple-controlled"
                value={rate}
                onChange={(e, newRate) => {
                  setRate(newRate);
                }}
              />

              {/* <input
            type="radio"
            name="rating"
            value="1"
            //onChangeでユーザーが変更するとrateに各valueが入ります（ここは１のタグなので１が入る）（本田）
            //rateが１の時は、ここにcheckを入れておいてくださいねという指示をcheckedで出します。（初期値の反映のため）（本田）
            checked={rate === 1}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <span>1</span>
          <input
            type="radio"
            name="rating"
            value="2"
            checked={rate === 2}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <span>2</span>
          <input
            type="radio"
            name="rating"
            value="3"
            checked={rate === 3}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <span>3</span>
          <input
            type="radio"
            name="rating"
            value="4"
            checked={rate === 4}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <span>4</span>
          <input
            type="radio"
            name="rating"
            value="5"
            checked={rate === 5}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <span>5</span> */}
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
              {/* <span>お酒：</span> */}
              <SInput
                type="name"
                name="name"
                //valueを追加しましょう
                value={nameText}
                placeholder="お酒の名前"
                onChange={(e) => {
                  // このsetValueはタグ部分で使われいるstateなので使いません。新しいstateを追加します。nameText。（本田）
                  // setValue(e.target.value);
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
              {/* <span>メモ：</span> */}
              <STextarea
                rows="10"
                cols="40"
                placeholder="メモ"
                // valueの追加、初期値いらないので無くても良いかも？(本田)
                value={memo}
                onChange={(e) => {
                  // このsetValueはタグ部分で使われいるstateなので使いません。memoは空欄で保存したい場合もあると思うので、必須入力にしません。そのため、ここでそのままsetMemoします（本田）
                  // setValue(e.target.value);
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
