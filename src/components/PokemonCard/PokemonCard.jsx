import "./PokemonCard.scss";
import bg from "../../assets/bg-img.png";

const PokemonCard = ({ data }) => {
  return (
    <>
      {data !== undefined && (
        <div className="pokemon-card">
          <img src={bg} alt="bg" className="pokemon__card-img" />
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
        </div>
      )}
    </>
  );
};

export default PokemonCard;
