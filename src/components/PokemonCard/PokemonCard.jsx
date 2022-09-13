import "./PokemonCard.scss";
import bg from "../../assets/bg-img.png";
import { Link } from "react-router-dom";

const PokemonCard = ({ data }) => {
  let color;

  switch (data.types[0]) {
    case "fire":
      color = "red";
      break;
    case "poison":
      color = "black";
    default:
      break;
  }

  return (
    <>
      {data !== undefined && (
        <Link
          to={`/pokemons/${data.species.name}`}
          className="pokemon-card text-decoration-none"
        >
          <img src={bg} alt="bg" className="pokemon__card-img" />
          <span className="pokemon-id">{`#00${data.id}`}</span>
          <div>
            <h3 className="mb-3 text-capitalize">{data.species.name}</h3>
            <div className="pokemon-info">
              {data?.types.map((t, i) => (
                <span className="mb-2" key={i}>
                  {t?.type.name}
                </span>
              ))}
            </div>
          </div>
          <div className="pokImg">
            <img src={data?.sprites?.front_default} alt="there's a photo" />
          </div>
        </Link>
      )}
    </>
  );
};

export default PokemonCard;
