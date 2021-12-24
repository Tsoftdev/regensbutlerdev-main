import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/settingsActions.js";
import Message from "../components/Message";
import Loader from "../components/Loader";

const SettingsScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productListDownload = useSelector((state) => state.productListDownload);
  const {
    loading,
    error,
    success: successDownload,
    data,
  } = productListDownload;

  const downloadHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts());
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (successDownload) {
      if (data) {
        setComment(data);
        setDownloaded(true);
      }
    }
  }, [userInfo, history, data, successDownload]);

  return (
    <>
      {userInfo && userInfo.isAdmin && (
        <Container>
          <h1 className="text-4xl">Administration</h1>
          <h1 className="text-xl">Produktdaten Optionen</h1>

          <div className="flex justify-start items-center p-2 mb-2 mt-4">
            <Button variant="primary" onClick={downloadHandler}>
              Produkt CSV anfordern
            </Button>
            <p className="ml-2">
              Lädt alle in der Tabelle products enthaltenen Produkte im CSV
              Format herunter
            </p>
          </div>
          <div className="flex justify-start items-center p-2 mb-2"></div>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : downloaded ? (
            <div className="flex-row justify-start items-center p-2 mb-2">
              <p className="mb-2">
                Status: Der CSV Download steht nun hier zur Verfügung:
              </p>

              <a
                className="textDecoration: underline"
                href={`/uploads/${comment}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong> {comment} </strong>
              </a>
            </div>
          ) : (
            <div className="flex-row justify-start items-center p-2 mb-2">
              <p className="mb-2">Status: keine Aktion</p>
            </div>
          )}
        </Container>
      )}
    </>
  );
};

export default SettingsScreen;
