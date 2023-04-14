import { useEffect, useRef, useState } from "react";

import RenderPokemon from "./components/render-pokemon/render-pokemon.component";
import SceletonLoading from "./components/sceleton-loading/sceleton-loading.component";

import pokeBallImg from "./assets/cartoon-pokeball.png";
import "./App.css";

const API_LIMIT = 20;

function App() {
  const [apiToFetch, setApiToFetch] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=${API_LIMIT}&offset=0`
  );
  const [pokemonData, setPokemonData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const getApi = (url) => fetch(url).then((res) => res.json());

  const sceletonRef = useRef(null);

  const fetchAllPokeData = async (pokeArray) => {
    const pokeUrls = [];
    for (let pokeData of pokeArray) {
      pokeUrls.push(getApi(pokeData.url));
    }
    try {
      const pokeDataRes = await Promise.all(pokeUrls);
      const newPokemonData = [...pokemonData, ...pokeDataRes];
      // console.log(newPokemonData, pokemonData, pokeDataRes);
      setPokemonData(newPokemonData);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPokeApi = async () => {
    try {
      setLoadingData(true);
      // console.log(apiToFetch);
      if (!apiToFetch) return (document.onscroll = null);
      const res = await getApi(apiToFetch);
      setApiToFetch(res.next);
      await fetchAllPokeData(res.results);
      setLoadingData(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPokeApi();
  }, []);

  const loadMore = () => {
    fetchPokeApi();
  };

  function checkVisible() {
    const rect = sceletonRef?.current?.getBoundingClientRect();
    // var rect = elm.getBoundingClientRect();
    const viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }

  const checkIfBottom = (e) => {
    console.log(checkVisible());

    // console.log(e.target.documentElement.scrollHeight);
    // const bottom =
    //   e.target.documentElement.scrollHeight -
    //     e.target.documentElement.scrollTop ===
    //   e.target.documentElement.clientHeight;
    // if (bottom) {
    //   loadMore();
    // }
    if (checkVisible() && !loadingData) loadMore();
  };

  useEffect(() => {
    // document.removeEventListener("scroll", checkIfBottom)
    // document.addEventListener("scroll", checkIfBottom)
    // if (document.onscroll) console.log("here");
    document.onscroll = checkIfBottom;
  }, [apiToFetch, pokemonData]);

  return (
    <div className="App">
      <img src={pokeBallImg} className="background-pokeball-img" />
      <header className="App-header">
        <h1 className="App-title">Welcome to Pokedex</h1>
      </header>
      <div className="pokemon-data-container">
        <RenderPokemon pokemonData={pokemonData} />
        {apiToFetch ? (
          <SceletonLoading ref={sceletonRef} apiLimit={API_LIMIT} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
