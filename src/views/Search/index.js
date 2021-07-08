

// MODIFICAR import { useState } from "react";
import { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";

// HASTA PROBAR CON FETCH, DESPUÉS IMPORTAR AXIOS
//import axios from "axios";

// ELIMINAR EL IMPORT DE DATA ->  import data from "../../data/users.json";

import "./style.css"
import SearchResults from "./components/SearchResults";

export default function Search(){
    const [isAtTop, setIsAtTop] = useState(false);
    const [results, setResults] = useState([]);
    //// AÑADIR VARIABLE DE ESTADO
    const [data, setData] = useState([]); 

    //// AÑADIR

    useEffect(() => {
        const getUsers = async () => {
            fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                // PRIMERO PROBAR SOLO CON CONSOLE
                console.log(data);
                // LUEGO AÑADIR EL SETDATA
                setData(data);
            });
        }; 
        getUsers().catch(null);
    }, []);

    ////   

    //// REFACTORING DEL CÓDIGO AÑADIDO ANTERIORMENTE PARA FINALIZAR

   /* useEffect(() => {
        const getUsers = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
                setData(data);
        }; 
        getUsers().catch(null);
    }, []); */ 

    //// PROBAR CON AXIOS HASTA CONCLUIR CON FETCH !!! 

   /* useEffect(() => {
        const getUsers = async () => {
            try{
                const {data} = await axios.get("https://jsonplaceholder.typicode.com/users");
                setData(data);
            } catch (err){
                console.error(err);
            }
        }; 
        getUsers().catch(null);
    }, []); */ 

    const handleCloseSearch = () => {
        setIsAtTop(false);
        setResults([]);
    };

    const handleSearchClick = (searchText) => {
        setIsAtTop(true);
        if(data?.length){
            const searchTextMinus = searchText.toLowerCase();
            const filteredData = data.filter((value) => (
                    value.name.toLowerCase().includes(searchTextMinus) || 
                    value.phone.toLowerCase().includes(searchTextMinus) || 
                    value.email.toLowerCase().includes(searchTextMinus) || 
                    value.username.toLowerCase().includes(searchTextMinus)
                )
            );
            setResults(filteredData);
        }
    };
  
    console.log(results);

    return(
        <div className={`search ${isAtTop ? "search--top" : "search--center"}`}>
            <SearchBox onSearch={handleSearchClick} onClose={handleCloseSearch} isSearching={isAtTop} />
            <SearchResults results = {results} isSearching={isAtTop}/>
        </div>
    );
}


// 4) después de construir este archivo, crear archivo "SearchBox.js"