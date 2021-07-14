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
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import ModalItemChoice from "../../utility/ModalItemChoice";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles(() => ({
  root: {
    width: "250px",
  },
}));

const Edit = ({ history }) => {
  const classes = useStyles();
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
  const yyyy = new Date().getFullYear();
  const mm = ("0" + (new Date().getMonth() + 1)).slice(-2);
  const dd = ("0" + new Date().getDate()).slice(-2);
  const [date, setDate] = useState(`${yyyy}-${mm}-${dd}`);

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
          dates: [new Date(date)],
        })
        .then((docRef) => {
          console.log("Document successfully written!");
          docRef
            .collection("memos")
            .add({
              //input dateのvalueはstring型なので、timestamp型に変換してsetします。
              // date: date,
              date: new Date(date),
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
          dates: [new Date(date)],
        })
        .then((docRef) => {
          console.log("Document successfully written!");
          docRef
            .collection("memos")
            .add({
              //input dateのvalueはstring型なので、timestamp型に変換してsetします。
              // date: date,
              date: new Date(date),
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

            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                name="simple-controlled"
                value={rate}
                onChange={(e, newRate) => {
                  setRate(newRate);
                }}
              />
            </Box>

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

          <div>
            <span>タグ：</span>
            <TagsList tags={choiceTagArray} />

            <SAddButton
              type="button"
              onClick={() => {
                setOpenModalTagChoice(true);
                setNewTagInput(true);
              }}
            >
              タグを追加する
            </SAddButton>
          </div>

          <div className={classes.root}>
            {/* <span>お酒：</span> */}
            <TextField
              type="name"
              name="name"
              //valueを追加しましょう
              value={nameText}
              label="お酒の名前"
              onChange={(e) => {
                // このsetValueはタグ部分で使われいるstateなので使いません。新しいstateを追加します。nameText。（本田）
                // setValue(e.target.value);
                setNameText(e.target.value);
              }}
            />
          </div>
          <div className={classes.root}>
            {/* <span>日付：</span> */}
            <TextField
              type="date"
              name="date"
              label="日付"
              //初期値を与えたいため、valueを追加します（本田）
              value={date}
              //初期値があるので、ここでそのままsetDateします。（本田）
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div>
            {/* <span>メモ：</span> */}
            <TextField
              rows="10"
              cols="40"
              label="メモ"
              // valueの追加、初期値いらないので無くても良いかも？(本田)
              value={memo}
              onChange={(e) => {
                // このsetValueはタグ部分で使われいるstateなので使いません。memoは空欄で保存したい場合もあると思うので、必須入力にしません。そのため、ここでそのままsetMemoします（本田）
                // setValue(e.target.value);
                setMemo(e.target.value);
              }}
            />
            <div>
              <SSaveButton type="submit">保存</SSaveButton>
            </div>
          </div>
        </SEditWrap>
      </section>
      <Footer
        setOpenModalItemChoice={setOpenModalItemChoice}
        history={history}
      />
    </>
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
  left: calc(169 / 375 * 100vw);
  z-index: 1;
  :before {
    content: "";
    background-color: #fff;
    height: calc(22 / 375 * 100vw);
    width: calc(22 / 375 * 100vw);
    position: absolute;
    border-radius: 50%;
    top: calc(9 / 375 * 100vw);
    left: calc(8 / 375 * 100vw);
    z-index: -1;
    filter: drop-shadow(
      calc(1 / 375 * 100vw) calc(5 / 375 * 100vw) calc(3 / 375 * 100vw)
        rgba(0, 0, 0, 0.5)
    );
  }
  .MuiSvgIcon-root {
    color: #000;
    border-radius: 50%;
    height: calc(38 / 375 * 100vw);
    width: calc(38 / 375 * 100vw);
  }
`;

const SAddButton = styled.button`
  background-color: #212121;
  color: #ffffff;
  border: none;
  width: calc(193 / 375 * 100vw);
  height: calc(28 / 375 * 100vw);
`;

const SSaveButton = styled.button`
  background-color: #212121;
  color: #ffffff;
  border: none;
  width: calc(193 / 375 * 100vw);
  height: calc(28 / 375 * 100vw);
`;

export default Edit;
