import React from "react";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

function PaginateMatUi({
  pages,
  page,
  isAdmin = false,
  key_kat,
  key_ukat,
  key_dkat,
}) {
  return (
    pages > 1 && (
      <Pagination
        page={page}
        count={pages}
        variant="outlined"
        color="primary"
        size="large"
        siblingCount={1}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={
              !isAdmin
                ? `/page/${item.page}?key_kat=${key_kat}&key_ukat=${key_ukat}&key_dkat=${key_dkat}`
                : `/admin/productlist/${item.page}`
            }
            {...item}
          />
        )}
      />
    )
  );
}

export default PaginateMatUi;
