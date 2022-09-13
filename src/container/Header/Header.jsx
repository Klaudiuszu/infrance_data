import { useEffect, useMemo, useState } from "react";
import useForm from "./useForm";
import axios from "axios";// używam do tworzenia zapytań w przeglądarce
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import "./Header.scss";

const Header = () => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0); // jeśli chciałbym użyć paginacji dla bazy zacząłbym od tych dwóch stanów - w tym przypadku nie jest to konieczne
  const [data, setData] = useState([]);
  const [btnState, setBtnState] = useState(false);

  const [error, setError] = useState(null);

  //const [value, handleChange] = useForm();

  const [detail, setDetail] = useState({name: ""});
  const [name, setName] = useState("");

  console.log(detail)
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setDetail((prev) => {
    return { ...prev, [name]: value};
    });
  };

console.log(data)

const handleSubmit = (e) => {
  e.preventDefault();
}


  
  const { t } = useTranslation();
  
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios(
//         `https://api.genderize.io?name=${items}`,
//       );
//       setData(result.data);
//     };
//     fetchData();
// },[]);

   useEffect(() => {
      fetch(`https://api.genderize.io?name=${detail.name}`)
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setData(data);
          })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

const addName = () => {

  setBtnState((btnState) => !btnState);
}



  return (
    <div className="app__Header">
      <form 
        onSubmit={handleSubmit}
        >
          <label>
            <h1>{t("translation_test")}</h1>
            <input 
            type="text"
            name="name"
            onChange={handleChange}
            />
          </label>
        <button 
        onClick={addName}
        className="main-button"
        type="submit"
        >{t("check")}
        </button>
      </form>
      <div 
      className="app__Header-result"
      style={{ visibility: btnState ? "visible" : "hidden" }}
      >
        <div className="app__Header-wrapper">
          <h2>{t("translation_test")}</h2>
          <h1>{data.name}</h1>
          <h1>{data.gender}</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
