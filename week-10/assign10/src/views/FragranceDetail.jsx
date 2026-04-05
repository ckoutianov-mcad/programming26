import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Home } from "./Home";
export function FragranceDetail({ data }) {
  const { id } = useParams();
  console.log("params", id);
  const selectedFragrance = data.find((fragrance) => fragrance.id === id);
  console.log(selectedFragrance);

  return (
    <>
      <nav>
        <Link to="../">Return to Fragrance Collection</Link>
      </nav>
      <div className="selectedFragrance">
        <h1>{selectedFragrance.name}</h1>
        <img src={selectedFragrance.image} alt={selectedFragrance.name} />
        <p>SCENT TYPE: {selectedFragrance.scentType}</p>
        <p>NOTES: {selectedFragrance.notes}</p>
        <p>DESCRIPTION: {selectedFragrance.description}</p>
        <p>
          IS IT LAYERABLE?{" "}
          {(selectedFragrance.isLayerable && (
            <p> This is layerable with other fragrances.</p>
          )) || <p> This is not layerable with other fragrances. </p>}
        </p>
      </div>
    </>
  );
}

FragranceDetail.PropTypes = {
    data: PropTypes.array
}