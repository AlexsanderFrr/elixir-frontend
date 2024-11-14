import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../css/LoginForm.css';
import InputField from './InputField';
import PasswordField from './PasswordField';
import ErrorMessage from './ErrorMessage';

const schema = yup.object({
  email: yup.string().email("Email Inválido").required("Informe seu email"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos").required("Informe sua senha")
});

const LoginForm = ({ login, isLoading }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    login(data.email, data.password);
  };

  return (
    <div className="login-form">
      <h2>Faça login na sua conta</h2>
      
      {/* Campo de Email */}
      <ErrorMessage message={errors.email?.message} />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            icon="mail-outline"
            placeholder="Email"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.email}
          />
        )}
      />

      {/* Campo de Senha */}
      <ErrorMessage message={errors.password?.message} />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <PasswordField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.password}
          />
        )}
      />

      {/* Botão Esqueceu sua senha? */}
      <button className="forgot-password-button" onClick={() => {/* Ação para redefinir senha */}}>
        Esqueceu sua senha?
      </button>

      {/* Botão de Entrar */}
      <button className="login-button" onClick={handleSubmit(onSubmit)}>
        {isLoading ? <span className="loader"></span> : 'Entrar'}
      </button>
    </div>
  );
};

export default LoginForm;
