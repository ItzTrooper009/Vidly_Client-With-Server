import React from "react";
import { Fab } from "@mui/material";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    // <ul className="list-group">
    //   {items.map((item) => (
    //     <li
    //       onClick={() => onItemSelect(item)}
    //       key={item[valueProperty]}
    //       className={
    //   item === selectedItem
    //     ? "list-group-item active"
    //     : "list-group-item clickable"
    // }
    //     >
    //       <Fab>{item[textProperty]}</Fab>
    //     </li>
    //   ))}
    // </ul>
    items.map((item) => (
      <Fab
        onClick={() => onItemSelect(item)}
        key={item[valueProperty]}
        size="medium"
        color={item === selectedItem ? "primary" : ""}
        variant="extended"
        className="mb-2 mr-2 ml-2 noOutline"
        style={{ width: "100%" }}
      >
        {item[textProperty]}
      </Fab>
    ))
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
