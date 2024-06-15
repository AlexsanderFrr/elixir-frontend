import React, { useState } from 'react';
import { LiaFileUploadSolid } from 'react-icons/lia';
import axios from 'axios';

const CadIngrediente = () => {
  const [ingrediente, setIngrediente] = useState({
    nome: '',
    beneficios: '',
    img: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setIngrediente({ ...ingrediente, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setIngrediente({ ...ingrediente, img: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nome', ingrediente.nome);
    formData.append('beneficios', ingrediente.beneficios);
    formData.append('img', ingrediente.img);

    try {
      await axios.post('https://elixir-backend-60fb.onrender.com/ingredientes/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Ingrediente cadastrado com sucesso!');
    } catch (error) {
      console.error(
        'Erro ao cadastrar o Ingrediente:',
        error.message,
        error.response?.data
      );
    }
  };

  return (
    <div className="cadastro-ingrediente-container">
      <h1>Cadastro de Ingrediente</h1>
      <form onSubmit={handleSubmit} className="cadastro-ingrediente-form">
      <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={ingrediente.nome}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Beneficios:
          <textarea
            name="beneficios"
            value={ingrediente.beneficios}
            onChange={handleInputChange}
          />
        </label>
        <br />
        
        <div className="upload-container">
            <LiaFileUploadSolid />
            <input type="file" name="imagem" onChange={handleFileChange} />
          </div>
       
        {ingrediente.img && (
          <div className="image-preview">
            <img
              src={URL.createObjectURL(ingrediente.img)}
              alt="Preview da Imagem"
              style={{ maxWidth: "100px" }}
            />
          </div>
        )}
        <br />
        
        <button type="submit" className='button'>Cadastrar Ingrediente</button>

      </form>
    </div>
  );
};

export default CadIngrediente;
