import React from 'react';
import {FiCheckCircle} from 'react-icons/fi';
import {useHistory} from 'react-router-dom';

import './styles.css';

const Success = () => {

  const history = useHistory();

  setTimeout(() => {
    history.push('/');
  }, 2000);

  return (
    <div id="page-success">
      <span className="success-message">
        <FiCheckCircle size={50} /> 
        <h1>
          Cadastro concluído!
        </h1>
      </span>
    </div>
  )
}

export default Success;