import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ItemCard.css";
import layer from "../assets/icons/layerable.png";
import trash from "../assets/icons/delete.png";
import copy from "../assets/icons/copy.png";
export default function ItemCard({
  name,
  notes,
  description,
  isLayerable,
  image,
  id,
  deleteFunction,
  duplicateFunction,
}) {
  return (
    <div className="fragranceCard">
      {isLayerable && (
        <div className="isLayerable">
          {" "}
          <img src={layer} title="Layerable fragrance" />
          Layerable
        </div>
      )}
      <div className="cardTitle">
        <Link to={`${id}`}>
        {name}</Link></div>
      <div className="cardImage">
        <img src={image} alt={name} />
      </div>
      <p className="notes">{notes}</p>
      <p className="description">{description}</p>
      <div className="action">
        <a
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            deleteFunction(id);
          }}
        >
          <img src={trash} />
        </a>
        <a
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            duplicateFunction(id);
          }}
        >
          <img src={copy} />
        </a>
      </div>
    </div>
  );
}
ItemCard.propTypes = {
  name: PropTypes.string,
  fragranceFamily: PropTypes.string,
  scentType: PropTypes.string,
  notes: PropTypes.string,
  description: PropTypes.string,
  isLayerable: PropTypes.bool,
  image: PropTypes.string,
  id: PropTypes.string,
  deleteFunction: PropTypes.func,
  duplicateFunction: PropTypes.func,
};
