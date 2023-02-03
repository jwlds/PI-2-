import React from "react";
import Loading from "../../contexts/Loading/LoadingSpinner.js"
import axios from "axios";
import "../UsagePage/styles.css";
import Modal from "react-modal";
import Swal from "sweetalert2";



const customStyles = {
    overlay: {
      position: "fixed",
      backgroundColor: "rgba(0,0,0,0.5)",

    },
    content: {
      width: "90rem",
      padding: 10,
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      background: "#fff",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px"
    },
  };
  Modal.setAppElement("#root");
const UsagePage = () => {
    const [codigo, setCodigo] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [selected, setSelected] = React.useState(0);
    const [modalIsOpen, setIsOpen] = React.useState(false);
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
    const checkStatus = (value) => {
      if (value === 0) {
        return <span className="disabled">Não utilizado</span>;
      } else if (value === 1) {
        return <span className="activated">Em utilização</span>;
      } else if(value === 3)  {
        return <span className="expired">Segundo uso do bilhete</span>;
      }
      else {
        return <span className="expired">Expirado</span>;
      }
    };
    const selectRecharge = (idticket) => {
        let newSelected = idticket;
        setSelected(newSelected);
        console.log(selected);
      };
    const openModal = () => {
      setIsOpen(true);
    };
    const closeModal = () => {
      setIsOpen(false);
    };
    const checkRecharges = (event) => {
        event.preventDefault();
        setLoading(true);
        axios(`http://localhost:5000/check/${codigo}`)
          .then((response) => {
            if (response.status === 200) {
              setLoading(false);
              openModal();
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
                text: `Bilhete não possui recargas válidas deverá se dirigir a um terminal para recarga.`,
              })
            }
          });
      };
      const useTicket = (event) => {
        axios.put("http://localhost:5000/teste",
        {idRecharge: selected})
        .then((response) => {
          if (response.status === 201) {
            closeModal();
            Swal.fire({
              position: "top",
              icon: "success",
              title: `Catraca liberada!(Primeiro uso)`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
          else if (response.status === 200) {
            closeModal();
            Swal.fire({
              position: "top",
              icon: "success",
              title: `Catraca liberada!`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
          else if (response.status === 202) {
            closeModal();
            Swal.fire({
              position: "top",
              icon: "success",
              title: `Catraca liberada! (Segundo uso do bilhete duplo)`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch((err) => {
          if(err.response.status === 401)
          {
            closeModal();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: ' Recarga expirada!',
            })
          }
          else if(err.response.status === 500)
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Erro 500`,
            })
          }
          else if(err.response.status === 500)
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Erro 500`,
            })
          }
        });
    };
    
      if (loading) {
        return (
          <div className="loading">
            <Loading></Loading>
          </div>
        );
      }
  return (
    <>
    <h1 className="h1-usage">Utilize seu bilhete AQUI</h1>
     <form className="form" onSubmit={checkRecharges}>
          <input
          type="text"
          onChange={(event) => {
            setCodigo(event.target.value);
          }}
          minLength={8}
          maxLength={8}
          className="form-control"
          id="validationDefaultCode2"
          placeholder="Digite o código do bilhete"
          required
          />

        <button className="btn-pos1" type="submit">
          Utilizar
          </button>
      </form>
      <Modal
        closeTimeoutMS={500}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      > 
          <h1>Selecione uma recarga</h1>
          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">#</th>
                <th scope="col">TIPO</th>
                <th scope="col">DATA DA RECARGA</th>
                <th scope="col">VALIDADE</th>
                <th scope="col">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ticket, index) => (
                  <tr key={ticket.ID_RECHARGE} className={ticket.ID_RECHARGE? "selected" : ""}>
                    <th scope="row">
                      <input
                        type="checkbox"
                        checked={ticket.ID_RECHARGE.selected}
                        className="form-check-input"
                        id="rowcheck{ticket.ID_RECHARGE}"
                        onClick={(e) =>  selectRecharge(ticket.ID_RECHARGE) }
                      />
                    </th>
                  <td>{ticket.ID_RECHARGE}</td>
                  <td>{ticket.TYPE_RECHARGE}</td>
                  <td>{format(ticket.DATETIME_RECHARGE)}</td>
                  <td>{format(ticket.VALIDITY)}</td>
                  <td>{checkStatus(ticket.STATUS)}</td>
                  </tr>
                ))}
              </tbody>
          </table>
        <button className="btn btn-primary btn-pos3" onClick={useTicket}>Usar bilhete</button>
      </Modal>
    </>
  );
};
export default UsagePage;
