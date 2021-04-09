import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Button, Image } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { useStore } from "../../app/stores/store";
export default function ImageUpload() {
  const [images, setImages] = React.useState<ImageListType>([]);
  const { userStore } = useStore();

  const defaultImageUrl =
    "/images/avatar-social-media-isolated-icon-design-vector-10704283.jpg";

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    if (imageList[0].file) {
      let formData = new FormData();
      formData.append("avatar", imageList[0].file);
      agent.Account.editAvatar(formData);
      console.log(imageList[0].file);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(images);
      }}
    >
      <ImageUploading value={images} onChange={onChange}>
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {userStore.user && !(imageList[0]) ?(
              <Image
                src={
                  userStore.user.avatar
                    ? "http://127.0.0.1:8000/api/show/avatar?url=" +
                      userStore.user.avatar
                    : defaultImageUrl
                }
                style={{ width: 150, height: 135, border: "1px solid white" }}
                circular
                inline
                {...dragProps}
              ></Image>
            ) :( <Image
              src={imageList[0].dataURL}
              style={{ width: 150, height: 135, border: "1px solid white" }}
              circular
              inline
              {...dragProps}
            ></Image>) }
            <Button style={{ margin: "auto 20px" }} onClick={onImageUpload} primary>
              Change
            </Button>
          </div>
        )}
      </ImageUploading>
    </form>
  );
}
