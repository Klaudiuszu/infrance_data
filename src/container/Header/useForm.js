import { useState } from 'react';

const useForm = () => {

    const [state, setState] = useState({});
    const letters =/^[a-zA-Z]*$/
    
    const handleChange = e => {
        e.persist();
        setState(state => ({...state, [e.target.name]: e.target.value.match(letters)}));     // tutaj waliduje wpisany tekst, jeśli wpisze znak spoza zakresu - zwracam "" 
      }

      return [state, handleChange];
}

export default useForm;