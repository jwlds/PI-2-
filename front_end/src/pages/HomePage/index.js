import React from "react";
import "../HomePage/styles.css";
import axios from "axios";
import Swal from "sweetalert2";
import homeimg3 from "../../img/tela_inicial.png";
import branco from "../../img/branco.png";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import LoadingSpinner from "../../contexts/Loading/LoadingSpinner";

const customStyles = {
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    background: "#fff",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const HomePage = () => {
  const [loading, setLoading] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const paginaBil = () => {
    navigate("/Bilhetes");
  }
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();
  const createTicket = () => {
    setLoading(true);
    axios.post("http://localhost:5000/create").then((response) => {
      if(response.status === 201)
      {
        setLoading(false);
        console.log("Enviado!");
        Swal.fire({
        position: "top",
        icon: "success",
        title: `Bilhete Gerado!`,
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/Bilhetes");
      }
    });
  };
  if (loading) {
    return (
      <div className="loading">
        <LoadingSpinner/>
      </div>
    );
  }
  return (
    <>
      <section className="u-align-center u-clearfix u-section-1">
        <div className="u-shape-1"></div>
        <div className="u-retangulo-princ"></div>
        <div className="u-shape-3"></div>
        <img className="u-image-1 img-1" src={homeimg3} alt=""></img>
        <h1 className="u-text-1 txt-1">Compre seu bilhete AQUI</h1>
        <div className="u-shape-4"></div>
        <div className="u-quadrado-p quad-p u-group-1">
          <div>
          <p className="u-frase">
              Se ainda não possuí o bilhete clique em "Gerar bilhete"
              <br></br><br></br>
              Se já pussuí o bilhete clique em "Recarregar bilhete"
            </p>
            <button className="u-botao-1 u-hover" onClick={openModal}>
            Gerar bilhete
            </button>
            <button className="u-botao-2 u-hover" onClick={paginaBil}>Recarregar bilhete</button>
          </div>
        </div>
        <img className="branco" src={branco} alt=""></img>
      </section>
      <section className="Modal">
        <Modal
          closeTimeoutMS={500}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h1 className="u-term">TERMO DE USO</h1>
          <p className="u-term-frase">
            - Será criado um código de 8 dígitos que deverá ser usado na hora
            <br></br> da recarga desejada.
            <br></br>
            <br></br>- Cada bilhete tem um período de validade diferente, após a validade
            <br></br> o bilhete será inutilizado até que uma nova recarga seja feita
          </p>
          <br></br>
          <br></br>
          <button
            id="btnCode"
            className="button red mobile"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            id="btnCode"
            className="button green mobile"
            onClick={createTicket}
          >
            Aceitar
          </button>
        </Modal>
      </section>
    </>
  );
};
export default HomePage;
