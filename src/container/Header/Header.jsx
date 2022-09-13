import { useEffect, useMemo, useState } from "react";
import useForm from "./useForm";
import axios from "axios"; // używam do tworzenia zapytań w przeglądarce

import "./Header.scss";

const Header = () => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0); // jeśli chciałbym użyć paginacji dla bazy zacząłbym od tych dwóch stanów - w tym przypadku nie jest to konieczne
  const [data, setData] = useState([]);
  const [btnState, setBtnState] = useState(false);
  const [nationality, setNationality] = useState([]);
  const [message, setMessage] = useState('');
  const [detail, setDetail] = useState({ name: "" });
  const [checkNames, setCheckNames] = useState(() => {
    const initialValue = []; 
    const namesJson = localStorage.getItem('itemList'); // pobieram dane jeśli istnieją w lockal storage
    if(namesJson !== null) {
      return JSON.parse(namesJson); // warunek, jeśli tablica coś zawiera zwróć dane do pustej tablicy
    }

  });
  
  console.log(checkNames);

  const unique = checkNames.filter((value, index) => {
    return checkNames.indexOf(value) === index;
  });

  console.log(unique)

  
  

  const handleChange = (e) => {
    
    const { name, value } = e.target;

    const result = value.replace(/[^a-z]/gi, '');

    setMessage(result);

    setDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    localStorage.setItem('itemList', JSON.stringify(unique)); // tworze lockal Storage w przeglądarce
  },[checkNames]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.genderize.io?name=${detail.name}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const str = data.name;
        setCheckNames(arr => [...arr, str])
      })
      .catch((err) => {
        console.log(err.message);
      });

  };


  const switcher = () => {
    setBtnState((btnState) => !btnState);
  };


  return (
    <div className="app__Header">
      <form onSubmit={handleSubmit}>
        <label>
          <h1>test</h1>
          <input type="text" name="name" onChange={handleChange} value={message}
          />
        </label>
        <button onClick={switcher} className="main-button" type="submit">
        check
        </button>
      </form>
      <div
        className="app__Header-result"
        style={{ visibility: btnState ? "visible" : "hidden" }}
      >
        <div className="app__Header-wrapper">
          <h1>{data.name}</h1>
          <h2>{data.gender}</h2>
          <button
          onClick={switcher}
          >close</button>
        </div>
      </div>
          {checkNames.map((item) => (
          <p className="app__Header-storage">{item}</p>
          ))}
    </div>
  );
};

export default Header;
