import { useState } from "react";

import Swiper from "react-id-swiper";
import styled from "styled-components";
import "swiper/css/swiper.css";

import Mockup_02 from "../../../../img/Mockup_02.png";
import Mockup_01 from "../../../../img/Mockup_01.png";

export const FCSwiper = ({ className }) => {
  const [params] = useState({
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      dynamicBullets: true,
    },
    loop: true,
  });
  return (
    <div className={className}>
      <Swiper {...params}>
        <div className={`${className}__slide01`}>
          <h1>
            あれ？前に呑んだお酒…。
            <br />
            なんだったっけ…？
          </h1>
          <p>「このお酒美味しい！覚えておこう！」</p>
          <p>…あなたは本当に覚えていられますか？</p>
          <p>
            あなたがほろ酔い気分でも、
            <br />
            Recholyは決して忘れません。
          </p>
          <p>
            こだわりのレコードのように
            <br />
            お気に入りのお酒を刻み込んでみませんか？
          </p>
        </div>
        <div className={`${className}__slide02`}>
          <img src={Mockup_01} alt="サイトイメージ" />
        </div>
        <div className={`${className}__slide03`}>
          <img src={Mockup_02} alt="サイトイメージ" />
        </div>
      </Swiper>
    </div>
  );
};

export const SwiperComponent = styled(FCSwiper)`
  width: 292px;
  height: 308px;
  .swiper-container {
    height: 308px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .swiper-container-horizontal
    > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
    transform: translateX(-50%);
    bottom: 0;
  }
  .swiper-pagination {
    /* display: flex;
    justify-content: space-between;
    width: 20%; */
  }
  .swiper-pagination-bullet {
    background-color: #414040;
    height: 9px;
    width: 9px;
    opacity: 1;
    margin: 0;
    /* left: 0; */
  }
  .swiper-pagination-bullet-active {
    background-color: #e2e2e2;
  }

  &__slide01 {
    height: 264.5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    h1 {
      font: normal normal normal 17px/29px Hiragino Sans;
      letter-spacing: 2.38px;
      text-align: center;
    }
    p {
      text-align: center;
      font: normal normal normal 12px/20px Hiragino Sans;
      letter-spacing: 1.2px;
      color: #a8a6a6;
    }
  }
  &__slide02 {
    display: flex;
    align-items: center;
    img {
      height: 264.5px;
    }
  }
  &__slide03 {
    display: flex;
    align-items: center;
    img {
      height: 264.5px;
    }
  }
`;
