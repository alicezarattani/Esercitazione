import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const dispatch = useDispatch();
  const Favourites = useSelector((state) => state.list);
  const navigate = useNavigate();

  return (
    <>
      <h1>Prova Prova</h1>;
    </>
  );
};

export default Favourites;
