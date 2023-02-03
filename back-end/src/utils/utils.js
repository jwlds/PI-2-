const  addValidity = (data, minutos) => {
    return new Date(data.getTime() + minutos * 60000);
  }


const randomCode = () => {
    return Math.random().toString(36).slice(-8);
  };
  
  module.exports = { randomCode, addValidity };