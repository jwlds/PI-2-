import React from "react";
//import Show from "../../contexts/ShowLog";
//import ActivationTicket from "../../contexts/activationTicket";
import "../TicketsPage/styles.css";
import ReportTicket from "../../contexts/report"


const ManagePage = () => {
  return (
    <>
      <div className="contentsManage">
        <div> 
          <ReportTicket></ReportTicket>
        </div>
      </div>
    </>
  );
};
export default ManagePage;


