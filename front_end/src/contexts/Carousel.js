import React  from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ticketGreen from "../img/ticket_bus_green.png"
import ticketBlue from "../img/ticket_bus_azul.png"
import ticketGrey from "../img/ticket_bus_cinza.png"
import ticketBlack from "../img/ticket_bus_black.png"
import qrCode from "../img/qrcode.png";
import Modal from "react-modal";
import Loading from "../contexts/Loading/LoadingSpinner";
import "../contexts/styles.css";

const customStyles = {
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    padding: 0,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    background: "linear-gradient(to right, #fff 40.73%,#1a1a1a 40.83%)",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const CarouselTickets = () => {
  const [modalUnicoIsOpen, setIsOpenModalUnico] = React.useState(false);
  const [modalDuploIsOpen, setIsOpenModalDuplo] = React.useState(false);
  const [modalWeekIsOpen, setIsOpenModalWeek] = React.useState(false);
  const [modalMonthIsOpen, setIsOpenModalMonth] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [codigo, setCodigo] = React.useState('');
  const openModalUnico = () => {
    setIsOpenModalUnico(true);
  };
  const openModalDuplo = () => {
    setIsOpenModalDuplo(true);
  };
  const openModalWeek = () => {
    setIsOpenModalWeek(true);
  };
  const openModalMonth = () => {
    setIsOpenModalMonth(true);
  };
  const closeModal = () => {
    setIsOpenModalUnico(false);
    setIsOpenModalDuplo(false);
    setIsOpenModalMonth(false);
    setIsOpenModalWeek(false);
  };
  const addNewTicketUnico = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post("http://localhost:5000/addRecharge", {
        codigo:  codigo,
        typeTicket: "UNICO",
      })
      .then((response) => {
        if (response.status === 201) {
          setLoading(false);
          console.log("Enviado!");
          setIsOpenModalUnico(false);
          Swal.fire({
            position: "top",
            icon: "success",
            title: `Recarga realizada!`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        if(err.response.status === 404)
        {
          setLoading(false);
          setIsOpenModalUnico(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Bilhete  não encontrado',
          })
        }
      });
  };
  const addNewTicketDuplo = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post("http://localhost:5000/addRecharge", {
        codigo: codigo,
        typeTicket: "DUPLO",
      })
      .then((response) => {
        if (response.status === 201) {
          setLoading(false);
          console.log("Enviado!");
          setIsOpenModalDuplo(false);
          Swal.fire({
            position: "top",
            icon: "success",
            title: `Recarga realizada!`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        if(err.response.status === 404)
        {
          setLoading(false);
          setIsOpenModalDuplo(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Bilhete  não encontrado',
          })
        }
      });
  };
  const addNewTicketWeek = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post("http://localhost:5000/addRecharge", {
        codigo: codigo,
        typeTicket: "SEMANAL",
      })
      .then((response) => {
        if (response.status === 201) {
          setLoading(false);
          console.log("Enviado!");
          setIsOpenModalWeek(false);
          Swal.fire({
            position: "top",
            icon: "success",
            title: `Recarga realizada!`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        if(err.response.status === 404)
        {
          setLoading(false);
          setIsOpenModalWeek(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Bilhete  não encontrado',
          })
        }
      });
  };
  const addNewTicketMonth = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post("http://localhost:5000/addRecharge", {
        codigo: codigo,
        typeTicket: "MENSAL",
      })
      .then((response) => {
        if (response.status === 201) {
          setLoading(false);
          console.log("Enviado!");
          setIsOpenModalMonth(false);
          Swal.fire({
            position: "top",
            icon: "success",
            title: `Recarga realizada!`,
            showConfirmButton: false,
            timer: 2000,
          });
        }   
      })
      .catch((err) => {
        if(err.response.status === 404)
        {
          setLoading(false);
          setIsOpenModalMonth(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Bilhete  não encontrado',
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
    <div>
      <Modal
        closeTimeoutMS={500}
        isOpen={modalUnicoIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="container">
          <div className="form-wrapper cf">
            <div className="five col">
              <div className="title">
                <h2>Bilhete Unico</h2>
                <br />
                <p className="text-muted ">
                  Bilhete Unico pode ser usado apenas uma vez<br></br>Validade
                  de 40 minutos.<br></br>
                </p>
                <img
                  className="cardImg"
                  src={ticketBlue}
                  alt="Bilhete Semanal"
                ></img>
                <p className="item">Valor</p>
                <p className="price">R$ 15,00</p>
              </div>
            </div>
            <div className="seven col">
              <div className="tab-content">
                <div className="innner">
                  <img
                    className="logoPix"
                    alt="pix"
                    width={300}
                    height={120}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Logo_-_pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.png/800px-Logo_-_pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.png"
                  ></img>
                </div>
                <br></br>
                <img
                  className="qrCode"
                  src={qrCode}
                  width={100}
                  height={100}
                  alt="qrCode"
                ></img>
                <form onSubmit={addNewTicketUnico}>
                  <input
                    className="inputCodigo"
                    type="text"
                    style={{ color: "white" }}
                    minLength={8}
                    maxLength={8}
                    onChange={(event) => {
                      setCodigo(event.target.value);
                    }}
                    placeholder="Digite o código do bilhete"
                    required
                  ></input>
                  <div className="wrapper">
                    <div className="px-4">
                      <div className="btnGrup">
                        <button
                          className="button red mobile"
                          onClick={closeModal}
                          type="button"
                        >
                          Cancelar
                        </button>
                        <button className="button green mobile" type="submit">
                          Confirmar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        closeTimeoutMS={500}
        isOpen={modalDuploIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="container">
          <div className="form-wrapper cf">
            <div className="five col">
              <div className="title">
                <h2>Bilhete Duplo</h2>
                <br />
                <p className="text-muted ">
                  Bilhete Duplo pode ser usado duas vezes<br></br>Validade de 40
                  minutos.<br></br>
                </p>
                <img src={ticketGreen} alt="Bilhete Semanal"></img>
                <p className="item">Valor</p>
                <p className="price">R$ 25,00</p>
              </div>
            </div>
            <div className="seven col">
              <div className="tab-content">
                <div className="innner">
                  <img
                    className="logoPix"
                    alt="pix"
                    width={300}
                    height="120"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Logo_-_pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.png/800px-Logo_-_pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.png"
                  ></img>
                </div>
                <br></br>
                <img
                  className="qrCode"
                  src={qrCode}
                  width={100}
                  height={100}
                  alt="qrCode"
                ></img>
                <form onSubmit={addNewTicketDuplo}>
                  <input
                    className="inputCodigo"
                    type="text"
                    style={{ color: "white" }}
                    minLength={8}
                    maxLength={8}
                    onChange={(event) => {
                      setCodigo(event.target.value);
                    }}
                    placeholder="Digite o código do bilhete"
                    required
                  ></input>
                  <div className="wrapper">
                    <div className="px-4">
                      <div className=" my-3"></div>
                      <button
                        className="button red mobile"
                        onClick={closeModal}
                        type="button"
                      >
                        Cancelar
                      </button>
                      <button className="button green mobile" type="submit">
                        Confirmar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        closeTimeoutMS={500}
        isOpen={modalWeekIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="container">
          <div className="form-wrapper cf">
            <div className="five col">
              <div className="title">
                <h2>Bilhete Semanal</h2>
                <br />
                <p className="text-muted ">
                  Bilhete Semanal não tem limite de utilização<br></br>Validade
                  de 7 dias<br></br>
                </p>
                <img src={ticketGrey} alt="Bilhete Semanal"></img>
                <p className="item">Valor</p>
                <p className="price">R$ 75,00</p>
              </div>
            </div>
            <div className="seven col">
              <div className="tab-content">
                <div className="innner">
                  <img
                    className="logoPix"
                    alt="pix"
                    width={300}
                    height="120"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Logo_-_pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.png/800px-Logo_-_pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.png"
                  ></img>
                </div>
                <br></br>
                <img
                  className="qrCode"
                  src={qrCode}
                  width={100}
                  height={100}
                  alt="qrCode"
                ></img>
                <form onSubmit={addNewTicketWeek}>
                  <input
                    className="inputCodigo"
                    type="text"
                    style={{ color: "white" }}
                    minLength={8}
                    maxLength={8}
                    onChange={(event) => {
                      setCodigo(event.target.value);
                    }}
                    placeholder="Digite o código do bilhete"
                    required
                  ></input>
                  <div className="wrapper">
                    <div className="px-4">
                      <div className=" my-3"></div>
                      <button
                        className="button red mobile"
                        onClick={closeModal}
                        type="button"
                      >
                        Cancelar
                      </button>
                      <button className="button green mobile" type="submit">
                        Confirmar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        closeTimeoutMS={500}
        isOpen={modalMonthIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="container">
          <div className="form-wrapper cf">
            <div className="five col">
              <div className="title">
                <h2>Bilhete Mensal</h2>
                <br />
                <p className="text-muted ">
                  Bilhete Mensal não tem limite de utilização<br></br>Validade
                  de 30 dias<br></br>
                </p>
                <img src={ticketBlack} alt="Bilhete Mensal"></img>
                <p className="item">Valor</p>
                <p className="price">R$ 150,00</p>
              </div>
            </div>
            <div className="seven col">
              <div className="tab-content">
                <div className="innner">
                  <img
                    className="logoPix"
                    alt="pix"
                    width={300}
                    height={120}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Logo_-_pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.png/800px-Logo_-_pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.png"
                  ></img>
                </div>
                <br></br>
                <img
                  className="qrCode"
                  src={qrCode}
                  width={100}
                  height={100}
                  alt="qrCode"
                ></img>
                <form onSubmit={addNewTicketMonth}>
                  <input
                    className="inputCodigo"
                    type="text"
                    style={{ color: "white" }}
                    minLength={8}
                    maxLength={8}
                    onChange={(event) => {
                      setCodigo(event.target.value);
                    }}
                    placeholder="Digite o código do bilhete"
                    required
                  ></input>
                  <div className="wrapper">
                    <div className="px-4">
                      <div className=" my-3"></div>
                      <div className="btnpagamento">
                      <button
                        className="button red mobile"
                        onClick={closeModal}
                        type="button"
                      >
                        Cancelar
                      </button>
                      <button className="button green mobile" type="submit">
                        Confirmar
                      </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <h1 className="u-text-2">Faça sua Recarga</h1><hr className="linha-1"></hr>
      <div className="contents">
      <img className="tic-green" src={ticketGreen} height="400px" alt="ticketGreen" onClick={openModalDuplo}></img>
      <img className="tic-blue" src={ticketBlue} height="400px" alt="ticketBlue" onClick={openModalUnico}></img>
      <img className="tic-grey" src={ticketGrey} height="400px" alt="ticketGrey" onClick={openModalWeek}></img>
      <img className="tic-black" src={ticketBlack} height="400px" alt="ticketBlack" onClick={openModalMonth}></img>
      </div>
      <p className="text-uni">Bilhete Único</p>
      <p className="text-dup">Bilhete Duplo</p>
      <p className="text-sem">Bilhete Semanal</p>
      <p className="text-men">Bilhete Mensal</p>
      <hr className="linha-2"></hr>
      <p className="preco-uni">R$ 15</p>
      <p className="preco-dup">R$ 25</p>
      <p className="preco-sem">R$ 75</p>
      <p className="preco-men">R$ 150</p>
    </div>
  );
};

export default CarouselTickets;
