import React, { useState } from 'react'
import TagsList from './TagsList';
import firebase, { storage } from "../config/firebase"
import { useParams } from 'react-router-dom';

const Edit = () => {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [rate, setRate] = useState(0);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [memo, setMemo] = useState('');

　
  // const user = useContext(AuthContext);
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  // if(user !== null) {
  //   const userRef = db.collection("users").doc(user.uid)
  //   const docRef = userRef
  //   .collection("drinks")
  //   .add({
  //     tags: tags,
  //     image: image,
  //     name: name,
  //     rate: rate
  //   })
  //   .then(()=>{
  //     console.log("Document successfully written!")
  //   })
  //   .catch((error)=> {
  //     console.log("Error writing document: ",error)
  //   })
  // }


  console.log(db)

//画像をアップロード
  const handleImage = (e) => {
    const image = e.target.files[0]
    setImage(image);
  }

  const uploadImage = () => {
    if(image === "") {
      alert("ファイルが選択されていません")
    }
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  }

  const next = snapshot => {
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
    console.log(snapshot);
  };
  const error = error => {
    console.log(error);
  };

  const complete = () => {
    storage
    .ref("images")
    .child(image.name)
    .getDownloadURL()
    .then(firebaseUrl => {
     pushDrinks(firebaseUrl)
    })
  }
  const pushDrinks = (firebaseUrl) => {
    if(user !== null) {
      const userRef = db.collection("users").doc(user.uid)
      
      userRef
      .collection("drinks")
      .add({
        tags: tags,
        imageUrl: firebaseUrl,
        name: name,
        rate: rate
      }).then((docRef)=>{
        console.log("Document successfully written!")
        docRef.collection("memos").add({
          // date: date,
          memo: memo
        })
      })
      .catch((error)=> {
        console.log("Error writing document: ",error)
      })
    }
      
    
    
  }
  const handleRate = () => {
    

  }

//タグの名前を入力
  const addTags = (e) => {
    e.preventDefault();
    if(value==="") return;

    setTags([
      ...tags,
      value
    ])
  }
  
  //メモを入力
  const addMemo = () => {
    // e.preventDefault()
    if(value ==="") return;

    setMemo(value)
  }
  //お酒の名前を入力
  const drinkName = () => {
    if(value === "") return;

    setName(value)
  }

  const addDate = () => {
    setDate(date);
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    uploadImage()
    addMemo()
    drinkName()
    // addDate()
  }
console.log(tags)
  return (
    <>
    <h1>ここはEditコンポーネントです</h1>
    <form onSubmit={handleSubmit}>
        <div>
          <span>画像：</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
        </div>
      
      <img src={imageUrl} alt="uploaded"/>
      
        <div>
        　<span>レーティング：</span>
          <span>1</span>
          <input　type="radio" name="rating" value="1"/>
          <span>2</span>
          <input　type="radio" name="rating" value="2"/>
          <span>3</span>
          <input　type="radio" name="rating" value="3"/>
          <span>4</span>
          <input　type="radio" name="rating" value="4"/>
          <span>5</span>
          <input　type="radio" name="rating" value="5"/>
        </div>
      
          <TagsList tags={tags} />
      
          <div>
            <span>タグ：</span>
            <input 
            name="name"
            placeholder="タグ"
            onChange={(e)=> {
              setValue(e.target.value)
            }}
            />
            <button 
            onClick={addTags} 
            type="submit">タグを追加する</button>
          </div>  
      
          <div>
            <span>お酒：</span>
            <input
              type="name"
              name="name"
              placeholder="お酒の名前"
              onChange={(e)=>{
                setValue(e.target.value)
              }}
            />
          </div>
        <div>
          <span>日付：</span>
          <input
          　type="date"
            name="date"
            placeholder="日付"
            onChange={addDate}
          />
        </div>
        <div>
          <span>メモ：</span>
          <textarea 
          type="submit"
          rows="10"
          cols="40"
          placeholder ="メモ"
          onChange={(e)=>{
            setValue(e.target.value)
          }}
          />
          <div>
            <button
            type="submit">
              保存する
            </button>
          </div>
        </div>
      
    </form>


    </>
  );
};

export default Edit;
