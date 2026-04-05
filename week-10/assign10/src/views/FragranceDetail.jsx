import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
export function FragranceDetail({ data }) {
  const { id } = useParams();
  console.log("params", id);
  const selectedFragrance = data.find((fragrance) => fragrance.id === id);
  console.log(selectedFragrance);

  return (
  <>
  <h1>{selectedFragrance.name}</h1>
  <img src={selectedFragrance.image} alt={selectedFragrance.name} />
  <p>SCENT TYPE: {selectedFragrance.scentType}</p>
  <p>NOTES: {selectedFragrance.notes}</p>
  <p>DESCRIPTION: {selectedFragrance.description}</p>
  <p>IS IT LAYERABLE: {selectedFragrance.isLayerable && (<p> This is layerable with other fragrances</p>) || (<p> This is not layerable with other fragrances </p> )}</p>

  </>
  )
}

FragranceDetail.PropTypes = {
    data: PropTypes.array
}