import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

function UserListScreen({ history }) {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Bist du sicher?"))
      dispatch(deleteUser(id));
  };
  return (
    <>
      <Container>
        <h1 className="text-4xl">Administration</h1>
        <h1 className="text-xl">Benutzerliste</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>ID</th>
                <th style={{ textAlign: 'center' }}>VORNAME</th>
                <th style={{ textAlign: 'center' }}>NACHNAME</th>
                <th style={{ textAlign: 'center' }}>Geburtsdatum</th>
                <th style={{ textAlign: 'center' }}>EMAIL</th>
                <th style={{ textAlign: 'center' }}>ADMIN</th>
                <th style={{ textAlign: 'center' }}>Aktion</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={{ textAlign: 'center' }}>{user.id}</td>
                  <td style={{ textAlign: 'center' }}>{user.vorname}</td>
                  <td style={{ textAlign: 'center' }}>{user.nachname}</td>
                  <td style={{ textAlign: 'center' }}>{user.birthday}</td>
                  <td style={{ textAlign: 'center' }}>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {user.isAdmin ? <CheckCircleIcon style={{ color: '#61d15f' }} /> : <HighlightOffIcon style={{ color: '#ff4136' }} />}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <LinkContainer to={`/admin/user/${user.id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <EditIcon />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user.id)}
                    >
                      <DeleteForeverIcon />
                    </Button>
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

export default UserListScreen;
