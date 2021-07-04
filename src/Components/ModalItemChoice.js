// import { useState } from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import AllDrinkListItem from "./AllDrinkListItem";

// const ModalItemChoice = ({ drinks, setOpenModalItemChoice }) => {
//   const [path, setPath] = useState(null);

  //   //OKクリック時の処理
  //   //AuthProvider導入までhistoryが使えないためコメントアウト
  //   const onClickPath = () => {
  //     if (path !== null) {
  //       history.push(`/edit/${path}`);
  //     } else {
  //       alert("お酒が選択されていません");
  //     }
  //   };

//   return (
//     <>
//       <SModalWrap>
//         <SModalInner>
//           <button
//             onClick={() => {
//               setOpenModalItemChoice(false);
//             }}
//           >
//             戻る
//           </button>
//           <p>どのお酒にメモを残しますか？</p>
//           <ul>
//             {drinks &&
//               drinks.map((drink) => {
//                 return (
//                   <AllDrinkListItem
//                     key={drink.id}
//                     id={drink.id}
//                     drink={drink.drink}
//                     setPath={setPath}
//                   />
//                 );
//               })}
//           </ul>
//           <Link to={`edit/${path}`}>
//             {/* <button onClick={onClickPath}>OK</button> */}
//             <button>OK</button>
//           </Link>
//           <p>もしくは</p>
//           <Link to="/edit/new">
//             <button>新しく追加する</button>
//           </Link>
//         </SModalInner>
//       </SModalWrap>
//     </>
//   );
// };

// const SModalWrap = styled.section`
//   z-index: 1;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const SModalInner = styled.div`
//   background-color: #fffffe;
//   width: calc(1500 / 1920 * 100vw);
//   height: calc(1900 / 1920 * 100vw);
//   border-radius: calc(65 / 1920 * 100vw);
// `;

// export default ModalItemChoice;
