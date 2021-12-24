import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadProducts } from "../actions/settingsActions";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const DropzoneUploader = (props) => {
  const dispatch = useDispatch();

  const productListUpload = useSelector((state) => state.productListUpload);
  const {
    loading: productListUploadLoading,
    error: productListUploadError,
    success: productListUploadSuccess,
    data: productListUploadData,
  } = productListUpload;

  const onDrop = useCallback(
    (acceptedFiles) => {
      let formData = new FormData();
      formData.append("uploadCSV", acceptedFiles);

      dispatch(uploadProducts(formData));
    },
    [dispatch]
  );

  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone(
    { onDrop },
    {
      // Disable click and keydown behavior
      noClick: true,
      noKeyboard: true,
      maxFiles: 1,
      accept: ".csv",
    }
  );

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
        <Button variant="primary" type="button" onClick={open}>
          Produkt CSV hochladen
        </Button>
      </div>
      <aside>
        <h4>Hochgeladene Datei</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};

export default DropzoneUploader;
