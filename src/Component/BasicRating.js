import * as React from "react";
import Rating from "@mui/material/Rating";

const BasicRating = ({ value }) => {
  return <Rating name="simple-controlled" value={value ? value : 0} />;
};

export default BasicRating;
