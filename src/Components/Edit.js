import React, { useState } from "react";
import TagsList from "./TagsList";
import firebase, { storage } from "../config/firebase";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const did = useParams().id;
  console.log(did);

  const handleImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (image === "") {
      alert("ファイルが選択されていません");
    }
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };

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
      .child(image.name)
      .getDownloadURL()
      .then((firebaseUrl) => {
        setImageUrl(firebaseUrl);
      });
  };

  //タグの名前を入力
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") return;

    setTags([...tags, value]);
  };

  console.log(tags);
  return (
    <>
      <h1>ここはEditコンポーネントです</h1>
      <form onSubmit={onSubmit}>
        <div>
          <span>画像：</span>
          <input type="file" accept="image/*" onChange={handleImage} />
          <button>Upload</button>
        </div>
      </form>
      <img src={imageUrl} alt="uploaded" />
      <div>
        　<span>レーティング：</span>
        <span>1</span>
        <input type="radio" name="rating" value="1" />
        <span>2</span>
        <input type="radio" name="rating" value="2" />
        <span>3</span>
        <input type="radio" name="rating" value="3" />
        <span>4</span>
        <input type="radio" name="rating" value="4" />
        <span>5</span>
        <input type="radio" name="rating" value="5" />
      </div>
      <TagsList tags={tags} />
      <form onSubmit={handleSubmit}>
        <div>
          <span>タグ：</span>
          <input
            name="name"
            placeholder="タグ"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button onClick={handleSubmit} type="submit">
            タグを追加する
          </button>
        </div>

        <div>
          <span>お酒：</span>
          <input type="name" name="name" placeholder="お酒の名前" />
        </div>
        <div>
          <span>日付：</span>
          <input type="date" name="date" placeholder="日付" />
        </div>
        <div>
          <span>メモ：</span>
          <textarea rows="10" cols="40" placeholder="メモ" />
          <div>
            <button>保存する</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Edit;
