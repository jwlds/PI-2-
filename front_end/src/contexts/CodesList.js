import React from "react";
import axios from "axios";
import LoadingFace from "../contexts/LoadingFacebook/index";
//import Swal from "sweetalert2";

const CodesList = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  
  React.useEffect(() => {
    const ticket = () => {
    setLoading(true);
    axios("http://localhost:5000/getAllTickets")
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          const fetchedData = response.data;
          //console.log('fetchdData',fetchedData)
          setData(fetchedData);
        }
      })
      .catch((err) => {
        if(err.response.status === 404)
        {
          setLoading(false);

        }
      });
    }
    ticket();
  }, []);
   if (loading)  {
    return <div className="loading"><LoadingFace></LoadingFace></div>
  } 
  return (
    <div>
      <span  className="CodeTicket">Seu bilhete:  </span>
      {data.length > 0 &&
        data.map((item, index) => (
          <span className="CodeTicket"key={index}>{item.COD}</span>
        ))}
    </div>
  );
};

export default CodesList;
