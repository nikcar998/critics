import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import agent from "../../app/api/agent";
export default function ImageUpload() {
  const [images, setImages] = React.useState<ImageListType>([]);
  const maxNumber = 1;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    if (imageList[0].file) {
      let formData = new FormData();
      formData.append("avatar", imageList[0].file)
      agent.Account.editAvatar(formData);
      console.log(imageList[0].file);
    }
  };
  return (
    <form onSubmit={(e)=>{e.preventDefault(); console.log(images)}} ><ImageUploading value={images} onChange={onChange}>
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
        <button
          style={isDragging ? { color: "red" } : undefined}
          onClick={onImageUpload}
          {...dragProps}
        >
          Click or Drop here
        </button>
        &nbsp;
        <button onClick={onImageRemoveAll}>Remove all images</button>
        {imageList.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.dataURL} alt="" width="100" />
            <div className="image-item__btn-wrapper">
              <button onClick={() => onImageUpdate(index)}>Update</button>
              <button onClick={() => onImageRemove(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </ImageUploading></form>
    
  );
}
