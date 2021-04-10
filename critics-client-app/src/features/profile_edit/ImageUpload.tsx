import React, { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Button, Image } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { useStore } from "../../app/stores/store";

//this component gives the possibility to update the user's avatar
//it uses  "react-images-uploading"
export default function ImageUpload() {
  const [images, setImages] = useState<ImageListType>([]);
  const [loading, setLoading] = useState(false);
  const { userStore } = useStore();

  //default avatar
  const defaultImageUrl =
    "/images/avatar-social-media-isolated-icon-design-vector-10704283.jpg";

  const onChange = (
    imageList: ImageListType,
  ) => {
    // data for submit
    setImages(imageList);
    if (imageList[0].file) {
      let formData = new FormData();
      formData.append("avatar", imageList[0].file);
      setLoading(true);
      agent.Account.editAvatar(formData).finally(()=>setLoading(false));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <ImageUploading value={images} onChange={onChange}>
        {({
          imageList,
          onImageUpload,
          isDragging,
          dragProps,
        }) => (
          // 
          <div className="upload__image-wrapper">
            <Image
              src={
                userStore.user && !imageList[0]
                  ? userStore.user.avatar
                    ? "http://127.0.0.1:8000/api/show/avatar?url=" +
                      userStore.user.avatar
                    : defaultImageUrl
                  : imageList[0].dataURL
              }
              style={{ width: 150, height: 150, border: !isDragging ? "1px solid black" : "1px solid red" }}
              circular
              inline
              {...dragProps}
            ></Image>

            <Button
              style={{ margin: "auto 20px" }}
              onClick={onImageUpload}
              primary
              loading={loading}
            >
              Change
            </Button>
          </div>
        )}
      </ImageUploading>
    </form>
  );
}
