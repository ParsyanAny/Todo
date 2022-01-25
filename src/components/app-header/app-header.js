import React from "react";
import "./app-header.css";
const style={
  fontSize:"40px"
}
const AppHeader = ({toDo, done}) => {
    return(
      <form className="app-header d-flex">
        <h1 style={style}>Todo List</h1>
        <h2>{toDo} more to do, {done} done</h2>
      </form>)}
  
export default AppHeader;