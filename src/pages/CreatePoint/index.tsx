import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import './styles.css';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

// Interfaces
interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);



  useEffect(() => {
    api.get('/items').then(response => { setItems(response.data) });
  }, []);


  return (
      <div id="page-create-point">
        <header>
          <img src={logo} alt="Ecoleta"/>

          <Link to="/">
            <FiArrowLeft/>
            Voltar para home
          </Link>
        </header>

        <form>
          <h1>Cadastro do <br/> ponto de coleta</h1>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input 
                type="text"
                name="name"
                id="name"
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input 
                  type="email"
                  name="email"
                  id="email"
                />
              </div>

              <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input 
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço do mapa</span>
            </legend>

            <Map center={[-20.9474023,-48.4487479]} zoom={15}>
              <TileLayer
                attribution='&amp;copy <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
                url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[-20.9474023,-48.4487479]} />
            </Map>

            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select name="uf" id="uf">
                  <option value="0">Selecione uma UF</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select name="city" id="city">
                  <option value="0">Selecione uma Cidade</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Ítens de coleta</h2>
              <span>Selecione um ou mais ítens abaixo</span>
            </legend>

            <ul className="items-grid">
              {
                items.map(item => (
                  <li key={item.id}>
                    <img src={item.image_url} alt={item.title}/>
                    <span>{item.title}</span>
                  </li>
                ))
              }
            </ul>
          </fieldset>

          <button type="submit">Cadastrar ponto de coleta</button>
        </form>

      </div>
  );
};

export default CreatePoint;