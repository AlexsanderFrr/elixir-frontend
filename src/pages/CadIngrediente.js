import React, { useState } from 'react';
import { LiaFileUploadSolid } from 'react-icons/lia';
import '../css/CadIngrediente.css'; // este arquivo contém a classe perfil-page estilizada
import { apiEndpoint } from '../config/constantes';

const CadIngrediente = () => {
  const [ingrediente, setIngrediente] = useState({
    nome: '',
    descricao: '',
    img: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIngrediente(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIngrediente(prev => ({ ...prev, img: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', ingrediente.nome);
    formData.append('descricao', ingrediente.descricao);
    if (ingrediente.img) {
      formData.append('img', ingrediente.img);
    }

    try {
      await apiEndpoint.post('/ingredientes/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Ingrediente cadastrado com sucesso!');
      setIngrediente({ nome: '', descricao: '', img: null });
    } catch (error) {
      console.error('Erro ao cadastrar o Ingrediente:', error);
      alert('Erro ao cadastrar o Ingrediente.');
    }
  };

  return (
    <div className="perfil-page">
      <div className="cadastro-ingrediente-container">
        <h1>Cadastro de Ingrediente</h1>

        <form onSubmit={handleSubmit} className="cadastro-ingrediente-form" noValidate>
          <label>
            Nome
            <input
              type="text"
              name="nome"
              value={ingrediente.nome}
              onChange={handleInputChange}
              placeholder="Ex: Gengibre"
              required
            />
          </label>

          <label>
            Benefícios
            <textarea
              name="descricao"
              value={ingrediente.descricao}
              onChange={handleInputChange}
              placeholder="Ex: Auxilia na digestão..."
              rows={4}
              required
            />
          </label>

          <div className="upload-container">
            <LiaFileUploadSolid size={22} color="#bb5104" />
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
              aria-label="Upload da imagem do ingrediente"
            />
          </div>

          {ingrediente.img && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(ingrediente.img)}
                alt="Preview da Imagem"
                loading="lazy"
              />
            </div>
          )}

          <button type="submit" className="button">
            Cadastrar Ingrediente
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadIngrediente;
