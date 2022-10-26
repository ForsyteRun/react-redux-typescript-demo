import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import s from "./Posts.module.css";

export const PostEdit = () => {

  const {id} = useParams()

  return (
    <>
      <h1>Edit post # {id} </h1>
      <div>
       
      </div>
    </>
  );
};
