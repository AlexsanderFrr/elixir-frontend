import React, { useState } from 'react';

import "./Geral.css";
import axios from "axios";
import { LiaFileUploadSolid } from "react-icons/lia";

const CadastroSuco = () => {
    const [suco, setSuco] = useState({
        nome: "",
        ingredientes: "",
        modo_de_preparo: "",
        beneficios: "",
        img1: null,
        data_lancamento: "",
      });
    
      const handleInputChange = (event) => {
        const { nome, value } = event.target;
        setSuco({ ...suco, [nome]: value });
      };
    
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSuco({ ...suco, img1: file });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append("nome", suco.nome);
        formData.append("ingredientes", suco.ingredientes);
        formData.append("modo_de_preparo", suco.mode_de_preparo);
        formData.append("beneficios", suco.beneficios);
        formData.append("img1", suco.img1);
    
        try {
          await axios.post("http://localhost:8081/suco/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("Suco cadastrado com sucesso!");
        } catch (error) {
          console.error(
            "Erro ao cadastrar o Suco:",
            error.message,
            error.response?.data
          );
        }
      };


  return (
    <div className="cadastro-filme-container">
      <h1>Cadastro de Suco</h1><br/>
      <form onSubmit={handleSubmit} className="cadastro-suco-form">
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={suco.nome}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Ingredientes:
          <textarea
            name="ingredientes"
            value={suco.ingredientes}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Modo de Preparo:
          <textarea
            name="modo_de_preparo"
            value={suco.modo_de_preparo}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <div className="upload-container">
            <LiaFileUploadSolid />
            <input type="file" name="imagem" onChange={handleFileChange} />
          </div>
        </label>
        {suco.img1 && (
          <div className="image-preview">
            <img
              src={URL.createObjectURL(suco.img1)}
              alt="Preview da Imagem"
              style={{ maxWidth: "100px" }}
            />
          </div>
        )}
        <br />
        
        <button type="submit" className='button'>Cadastrar Suco</button>
      </form>
    </div>
  );
}

export default CadastroSuco;