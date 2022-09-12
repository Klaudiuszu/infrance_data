import { useEffect, useMemo, useState } from "react";
import axios from "axios";// używam do tworzenia zapytań w przeglądarce
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import "./Header.scss";

const Header = () => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0); // jeśli chciałbym użyć paginacji dla bazy zacząłbym od tych dwóch stanów - w tym przypadku nie jest to konieczne
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  console.log("name "+ text)

  
  const { t } = useTranslation();
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.genderize.io?name=${items}`,
      );
      setData(result.data);
    };
    fetchData();
},[]);
  
  const handleSubmit = event => {
    event.preventDefault();
  }

const addName = () => {
  setItems(text);
}




  return (
    <div className="app__Header">
      <form 
        onSubmit={handleSubmit}
        >
          <label>
            <h1>{t("translation_test")}</h1>
            <input 
            name="name"
            onChange={e => setText(e.target.value)}
            />
          </label>
        <button 
        className="main-button"
        onClick={addName}
        >{t("check")}
        </button>
      </form>
      <div className="app__Header-result">
        <div className="app__Header-wrapper">
          <h2>{t("check-nationality")}</h2>
          <h1></h1>

        </div>
      </div>
    </div>
  );
};

export default Header;
