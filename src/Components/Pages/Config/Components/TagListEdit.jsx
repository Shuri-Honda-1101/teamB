import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../utility/AuthService";

//components
import UserTagListItem from "../../../utility/UserTagListItem";

//functions
import { addTagCollection } from "../../../libs/addTagCollection";
import { deleteTag } from "../../../libs/deleteTag";
import { onSnapShotCollectionTags } from "../../../libs/onSnapShotCollectionTags";

export const FCTagListEdit = ({ className, setOpen }) => {
  const [userTags, setUserTags] = useState(null);
  const [tagText, setTagText] = useState("");
  const user = useContext(AuthContext);

  useEffect(() => {
    onSnapShotCollectionTags(setUserTags, user);
  }, [user]);

  return (
    <div className={className}>
      <button onClick={() => setOpen(false)} className={`${className}__back`}>
        戻る
      </button>
      <h2 className={`${className}__title`}>タグ編集</h2>
      <div className={`${className}__tagList`}>
        <ul>
          {userTags &&
            userTags.map((tag) => {
              return <UserTagListItem tag={tag} key={tag.id} />;
            })}
        </ul>
      </div>
      <button
        onClick={() => {
          deleteTag(userTags, user);
        }}
        className={`${className}__btn`}
      >
        選択したタグを削除
      </button>
      <div className={`${className}__add`}>
        <input
          name="tag"
          placeholder="新規タグ追加"
          value={tagText}
          onChange={(e) => {
            setTagText(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            addTagCollection(e, tagText, setTagText, user);
          }}
        >
          追加
        </button>
      </div>
    </div>
  );
};

export const TagListEdit = styled(FCTagListEdit)``;
