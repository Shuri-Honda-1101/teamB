import styled from "styled-components";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useCallback, useState, useRef } from "react";
import { nanoid } from "nanoid";

export const FCModalCropper = ({
  setImageUrl,
  setSelectImageValue,
  imageUrl,
  setPreviewImage,
  setCroppedImage,
  className,
}) => {
  //unit:単位(% or px)
  const [crop, setCrop] = useState({ unit: "px", width: 300, aspect: 1 / 1 });
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const modalRef = useRef(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const trimming = () => {
    const canvas = canvasRef.current;
    const image = imgRef.current;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    //トリミング画像の描画
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    //blobに変換
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          blob.name = nanoid();
          resolve(blob);
        },
        "image/jpeg",
        1
      );
    });
  };

  //OKボタンがクリックされた時の処理
  const onClickTrimmingOK = async () => {
    const croppedImage = await trimming();
    setCroppedImage(croppedImage);
    //プレビュー用にURLにする
    const previewUrl = URL.createObjectURL(croppedImage);
    setPreviewImage(previewUrl);
    setImageUrl(null);
    setSelectImageValue("");
  };

  return (
    <div
      className={className}
      onClick={(e) => {
        //モーダルウィンドウの外側がクリックされたか判定、外側なら閉じる
        if (modalRef.current.contains(e.target)) return;
        setImageUrl(null);
        setSelectImageValue("");
      }}
    >
      <div className={`${className}__inner`} ref={modalRef}>
        <ReactCrop
          src={imageUrl}
          crop={crop}
          onImageLoaded={onLoad}
          keepSelection={true}
          onChange={(c) => {
            console.log(c);
            setCrop(c);
          }}
        />
        <div>
          <canvas hidden ref={canvasRef} />
        </div>
        <button type="button" onClick={onClickTrimmingOK}>
          OK
        </button>
      </div>
    </div>
  );
};

export const ModalCropper = styled(FCModalCropper)`
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    background-color: #fffffe;
    width: 315px;
    height: 453px;
    border-radius: 31px;
  }
`;
