import React from "react";
import { Row, Col, ListGroup, Image } from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { updateEachProductStar } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  Col: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2em",
    fontFamily: "Source Sans Pro",
    lineHeight: "1.2em",
  },
}));

const OrderItem = ({ item, isDelivered }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [star, setStar] = React.useState(item.star);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <ListGroup.Item className="mainfont">
      <Row>
        <Col md={3} xs={12} className={classes.Col}>
          <Image
            src={
              item.bildname
                ? item.pictureurl + item.bildname
                : item.pictureurl + "noimage.jpg"
            }
            alt={item.produktname}
            fluid
            rounded
          />
        </Col>
        <Col md={2} xs={6} className={classes.Col}>
          {item.produktname}
        </Col>
        <Col md={3} xs={6} className={classes.Col}>
          {item.qty} x €{item.vk} = €{(item.qty * item.vk).toFixed(2)}
        </Col>
        <Col md={2} xs={6} className={classes.Col}>
          Pfand: € {item.pfand}
        </Col>
        {isDelivered && (
          <Col md={2} xs={6} className={classes.Col}>
            <Rating
              name={`${item.id}-name`}
              id={`${item.id}-id`}
              value={star}
              precision={0.5}
              onChange={(event, newValue) => {
                setStar(newValue);
                dispatch(
                  updateEachProductStar(
                    item.bestellungenId,
                    item.productId,
                    newValue
                  )
                );
              }}
              readOnly={userInfo.isAdmin}
            />
          </Col>
        )}
      </Row>
    </ListGroup.Item>
  );
};

export default OrderItem;
