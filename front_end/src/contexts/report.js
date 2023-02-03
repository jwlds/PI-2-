import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "./Loading/LoadingSpinner";
import Swal from "sweetalert2";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    padding: 10,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    background: "#fff",
    margin: "none",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const ReportTicket = () => {
  const [codigo, setCodigo] = useState("");
  const [data, setData] = React.useState([]);
  const [use, setUse] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const checkStatus = (value) => {
    if (value === 0) {
      return <span className="disabled">Não utilizado</span>;
    } else if (value === 1) {
      return <span className="activated">Em utilização</span>;
    } else if(value === 3)  {
      return <span className="expired">Segundo uso</span>;
    }
    else {
      return <span className="expired">Expirado</span>;
    }
  };
  const format = (value) => {
    if(value === null) 
    {
      return null;
    }
    const date = new Date(value);
    const dateFormat =
      ("00" + date.getDate()).slice(-2) +
      "/" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    return dateFormat;
  };
  const teste2 = (id) => {
    setLoading(true);
    axios(`http://localhost:5000/useRecharges/${id}`)
      .then((response) => {
        if (response.status === 200) {
          
          setLoading(false);
          const fetchedDataUse = response.data;
          //console.log('fetchdData',fetchedData)
          setUse(fetchedDataUse);
          openModal();
        }
      })
      .catch((err) => {
        if(err.response.status === 404)
        {
          setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Não há utilização',
          })
        }
        else if(err.response.status === 500)
        {
          setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Erro 500`,
          })
        }
      });
  };
  const checkHistory = () => {
    setLoading(true);
    axios(`http://localhost:5000/check/${codigo}`)
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
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Bilhete  não encontrado',
          })
        }
        else if(err.response.status === 400)
        {
          setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Bilhete não possui recargas, dirija-se a um terminal para realizar uma recarga.`,
          })
        }
      });
  };
  if (loading) {
    return (
      <div className="loading">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }
  return (
    <>
      <div className="container">
      <Modal
      closeTimeoutMS={500}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    > Histórico de uso
     <br></br>
    {use.map((ticketUse, index) => (           
      <div key={index}>
      <p className="codeUse">{index+ 1}                {format(ticketUse.DATETIME_USE)}</p>
    </div>
      
    ))}</Modal>
        <div className="py-4">
          <h1 className="h1-hist">Histórico de utilização de bilhete</h1>
          <form onSubmit={checkHistory}>  
                  <div className="input-group">
                    <input 
                      minLength={8}
                      maxLength={8}
                      type="text"
                      onChange={(event) => {
                        setCodigo(event.target.value);
                      }}
                      className="form-control manageInput"
                      id="validationDefaultCode1"
                      placeholder="Digite código do bilhete"
                      required
                    ></input>
            <button className="btn btn-primary btn-pos" type="submit">
              Verificar
            </button>
            </div>
          </form>
          <br></br><br>
          </br><br></br>
          <table className="table border shadow table-pos">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Código do bilhete</th>
                <th scope="col">Data e hora da criação</th>
                <th scope="col"># ID</th>
                <th scope="col">TIPO</th>
                <th scope="col">DATA DA RECARGA</th>
                <th scope="col">VALIDADE</th>
                <th scope="col">STATUS</th>
                <th scope="col">UTILIZAÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ticket, index) => (
                
                <tr key={index}>
                  <td >{ticket.COD_TICKET}</td>
                  <td >{format(ticket.DATETIME)}</td>
                  <td >{ticket.ID_RECHARGE}</td>
                  <td>{ticket.TYPE_RECHARGE}</td>
                  <td>{format(ticket.DATETIME_RECHARGE)}</td>
                  <td>{format(ticket.VALIDITY)}</td>
                  <td>{checkStatus(ticket.STATUS)}</td>
                  <td>
                    <Link id="btnView" className="btn btn-primary mr-2" onClick={() => {teste2(ticket.ID_RECHARGE)}}>
                      Ver detalhes
                    </Link>
                  </td>
                </tr>
                
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReportTicket;
