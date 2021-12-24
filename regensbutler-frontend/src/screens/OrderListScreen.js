import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios from "axios";

function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get("/api/config/paypal");
    if (clientId) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
      script.async = true;
      script.onload = () => { };
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/");
    }
    if (!window.paypal) {
      addPayPalScript();
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Container className="xl:container mx-auto bg-white mt-20 p-0">
        <h1 className="text-4xl">Administration</h1>
        <h1 className="text-xl">Bestellungen</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>ID</th>
                <th style={{ textAlign: 'center' }}>BENUTZER</th>
                <th style={{ textAlign: 'center' }}>Erstellungsdatum</th>
                <th style={{ textAlign: 'center' }}>Lieferdatum und -uhrzeit</th>
                <th style={{ textAlign: 'center' }}>GESAMTPREIS</th>
                <th style={{ textAlign: 'center' }}>BEZAHLT</th>
                <th style={{ textAlign: 'center' }}>GELIEFERT</th>
                <th style={{ textAlign: 'center' }}>Aktion</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ textAlign: 'center' }}>{order.userId}</td>
                  <td style={{ textAlign: 'center' }}>{order.createdAt.substring(0, 10)}</td>
                  <td style={{ textAlign: 'center' }}>{order.lieferzeitpunkt}</td>
                  <td style={{ textAlign: 'center' }}>€{order.totalPrice}</td>
                  <td style={{ textAlign: 'center' }}>
                    {order.isPaid ? (
                      <div>
                        {order.paidAt.substring(0, 10)}
                        < CheckCircleIcon
                          style={{
                            color: '#61d15f',
                            marginLeft: 5
                          }}
                        />
                      </div>
                    ) : (
                      <HighlightOffIcon
                        style={{
                          color: '#ff4136'
                        }}
                      />
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {order.isDelivered ? (
                      <div>
                        {order.deliveredAt.substring(0, 10)}
                        < CheckCircleIcon
                          style={{
                            color: '#61d15f',
                            marginLeft: 5
                          }}
                        />
                      </div>
                    ) : (
                      <HighlightOffIcon
                        style={{
                          color: '#ff4136'
                        }}
                      />
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <LinkContainer to={`/order/${order.id}`} onClick={() => {
                      localStorage.setItem('userIdforAdmin', order.userId)
                    }}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}

export default OrderListScreen;
