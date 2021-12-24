import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Paginate.css";






function Paginate({
  pages,
  page,
  isAdmin = false,
  key_kat,
  key_ukat,
  key_dkat,
}) {
  return (
    pages > 1 && (
      <Pagination className="flex flex-wrap">
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            className="mt-1"
            key={x + 1}
            to={
              !isAdmin
                ? `/page/${
                    x + 1
                  }?key_kat=${key_kat}&key_ukat=${key_ukat}&key_dkat=${key_dkat}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
