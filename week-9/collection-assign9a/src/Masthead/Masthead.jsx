import mastheadImg from "../assets/masthead-fragrance-collection.png";
import "./Masthead.css";

export default function Masthead() {
  return (
    <div className="masthead">
      <img src={mastheadImg} alt="fragrance collection masthead image" />
    </div>
  );
}
