import React from "react";
import "../TicketsPage/styles.css";
import Carousel from "../../contexts/Carousel";
import CodesList from "../../contexts/CodesList";
//import ActivationTicket from "../../contexts/activationTicket";


const TicketsPage = () => {
  return (
    <>
    <div className="contentsCode"><CodesList></CodesList></div>
     <br></br><br></br><br></br><br></br><br></br> <br></br><br></br>
     <Carousel></Carousel>
    </>
  );
};
export default TicketsPage;
