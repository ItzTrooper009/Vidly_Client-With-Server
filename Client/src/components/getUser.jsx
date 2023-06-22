import { Component } from "react";
import auth from "../services/authService";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

class GetUser extends Component {
  state = { user: {} };

  render() {
    const { name, email, isAdmin } = auth.getCurrentUser();
    //console.log(auth.getCurrentUser());

    return (
      <div className="userInfo">
        <h3>Name : {name}</h3>
        <h3>E-mail : {email}</h3>
        <h4>{isAdmin ? "Admin User" : "Normal User"}</h4>

        <Button
          onClick={auth.logout}
          endIcon={<LogoutOutlinedIcon fontSize="small" />}
        >
          Logout
        </Button>
      </div>
      // <Tooltip
      //   title={`${email}${"_________"}${
      //     isAdmin ? "Admin User" : "Normal User"
      //   }`}
      //   arrow
      // >
      //   <Button size="large" color="success" variant="contained">
      //     {name}
      //   </Button>
      // </Tooltip>
    );
  }
}

export default GetUser;
