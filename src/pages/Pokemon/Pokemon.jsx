import "./Pokemon.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { West } from "@mui/icons-material";
import FullWidthTabs from "./PokemonTabs";
import Loading from "../../components/Loading/Loading";

const Pokemon = () => {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [pokemonDetail, setPokemonDetail] = useState({});
  console.log(pokemonDetail);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => setPokemonDetail(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [pokemonDetail]);

  return (
    <>
      {pokemonDetail ? (
        <section className="app__pokemon">
          <div
            className={`container-fluid py-5 ${pokemonDetail.data?.types[0].type.name}`}
          >
            <div className="container">
              <Link to="/pokemons" className="text-white text-decoration-none">
                <West />
              </Link>
              <div className="row justify-content-between align-items-center mt-5">
                <div className="col-md-5">
                  <h1 className="pok-name">{pokemonDetail.data?.name}</h1>
                  <div className="d-flex align-items-center">
                    {pokemonDetail.data?.types.map((t, i) => (
                      <span key={i} className="pok__types-name">
                        {t.type.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-md-2">
                  <span className="pok-id">{`#00${pokemonDetail.data?.id}`}</span>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="app__pokemon-img">
                    <img
                      src={pokemonDetail.data?.sprites.front_default}
                      alt="pokemon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid bg-white pokemon-infos">
            <div className="container">
              <FullWidthTabs
                about={pokemonDetail.data?.abilities}
                stats={pokemonDetail.data?.stats}
              />
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Pokemon;
