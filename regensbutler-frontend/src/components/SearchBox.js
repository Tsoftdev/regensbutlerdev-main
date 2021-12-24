import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      className="flex items-center flex-column justify-center h-32"
    >
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Artikelsuche"
        className="w-64"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="mt-2">
        Suchen
      </Button>
    </Form>
  );
};

export default SearchBox;
