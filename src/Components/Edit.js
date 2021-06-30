import React, { useState } from 'react'
import TagsList from './TagsList';
const Edit = () => {
  const [value, setValue] = useState('')
  const [tags, setTags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(value==="") return;

    setTags([
      ...tags,
      value
    ])
  }

console.log(tags)
  return (
    <>
    <h1>ここはEditコンポーネントです</h1>
      
    <form onSubmit ={handleSubmit}>
        <div>
          <span>画像：</span>
          <input
            type="file"
            accept="image/*"
          />
        </div>
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
            onClick={handleSubmit} 
            type="submit">タグを追加する</button>
          </div>  
        
        <div>
          <span>お酒：</span>
          <input
            type="name"
            name="name"
            placeholder="お酒の名前"
          />
        </div>
        <div>
          <span>日付：</span>
          <input
          　type="date"
            name="date"
            placeholder="日付"
          />
        </div>
        <div>
          <span>メモ：</span>
          <textarea 
          rows="10"
          cols="40"
          placeholder ="メモ"
          
          />
          <div>
            <button>
              保存する
            </button>
          </div>
        </div>
      </form>


    </>
  );
};

export default Edit;
