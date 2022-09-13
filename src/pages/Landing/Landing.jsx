import "./Landing.scss";
import { InputBase, Paper, CircularProgress } from "@mui/material";
import { Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import bg from "../../assets/bg-img.png";
import axios from "axios";
import { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState("");
  const [pokemonDetail, setPokemonDetail] = useState({});

  const fetchData = (e) => {
    e.preventDefault();
    if (pokemon) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res) => {
          setPokemonDetail(res);
          // console.log(res.data);
        })
        .catch(() => setPokemonDetail({ err: "Not Found" }));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
  }, [pokemonDetail]);

  return (
    <section className="app__landing">
      <img src={bg} alt="bg" className="header-bg" />
      <div className="container">
        <h1 className="text-center mb-4">What Pokemon are you looking for?</h1>
        <Paper
          component="form"
          onSubmit={fetchData}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            boxShadow: "none",
            margin: "0 auto",
          }}
        >
          <IconButton
            type="submit"
            onClick={fetchData}
            sx={{
              p: "10px",
              position: "relative",
              left: "3rem",
              zIndex: "2",
            }}
            aria-label="menu"
          >
            <Search />
          </IconButton>
          <InputBase
            sx={{
              padding: "8px 0px 8px 3.5rem",
              flex: 1,
              background: "#f4f5f4",
              borderRadius: "30px",
            }}
            placeholder="Search pokemons"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={(e) => setPokemon(e.target.value)}
          />
        </Paper>
        <div className="d-flex justify-content-center mt-4 mb-5">
          <div className="mx-3">
            <Link to="/pokemos" className="landing-links link-1">
              <span>Pokedox</span>
              <img src={bg} alt="bg" className="landing-bg" />
            </Link>
          </div>
          <div className="mx-3">
            <Link to="/" className="landing-links link-2">
              <span>Movies</span>
              <img src={bg} alt="bg" className="landing-bg" />
            </Link>
          </div>
        </div>
        <div className="">
          {!isLoading ? (
            <CircularProgress
              size={68}
              sx={{
                display: "block",
                margin: "0 auto",
              }}
            />
          ) : (
            <>
              <h1 className="text-center">{pokemonDetail?.err}</h1>
              <PokemonCard data={pokemonDetail?.data} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Landing;
