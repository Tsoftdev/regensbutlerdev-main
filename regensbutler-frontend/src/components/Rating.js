import React from "react";
import PropTypes from "prop-types";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";

function Rating({ val, text, color, fontSize }) {
  return (
    <div className="rating">
      <span>
        {val >= 1 ? (
          <StarIcon style={{ color, fontSize }} />
        ) : val >= 0.5 ? (
          <StarHalfIcon style={{ color, fontSize }} />
        ) : (
          <StarBorderIcon style={{ color, fontSize }} />
        )}
      </span>
      <span>
        {val >= 2 ? (
          <StarIcon style={{ color, fontSize }} />
        ) : val >= 1.5 ? (
          <StarHalfIcon style={{ color, fontSize }} />
        ) : (
          <StarBorderIcon style={{ color, fontSize }} />
        )}
      </span>
      <span>
        {val >= 3 ? (
          <StarIcon style={{ color, fontSize }} />
        ) : val >= 2.5 ? (
          <StarHalfIcon style={{ color, fontSize }} />
        ) : (
          <StarBorderIcon style={{ color, fontSize }} />
        )}
      </span>
      <span>
        {val >= 4 ? (
          <StarIcon style={{ color, fontSize }} />
        ) : val >= 3.5 ? (
          <StarHalfIcon style={{ color, fontSize }} />
        ) : (
          <StarBorderIcon style={{ color, fontSize }} />
        )}
      </span>
      <span>
        {val >= 5 ? (
          <StarIcon style={{ color, fontSize }} />
        ) : val >= 4.5 ? (
          <StarHalfIcon style={{ color, fontSize }} />
        ) : (
          <StarBorderIcon style={{ color, fontSize }} />
        )}
      </span>
      <div>{text && text}</div>
    </div>
  );
}

Rating.defaultProps = { val: 0, color: "#ffd700", fontSize: "large" };

Rating.propTypes = {
  val: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};
export default Rating;
