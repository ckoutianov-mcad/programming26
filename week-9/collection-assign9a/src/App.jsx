import { useState } from "react";
import "./App.css";
import Masthead from "./Masthead/Masthead";
import ItemCard from "./ItemCard/ItemCard";
import { nanoid } from "nanoid";
import { NewCardForm } from "./NewCardForm/NewCardForm";
function App() {

  //wrapping array in useState
  const [fragrances, setFragrances] = useState([
    {
      name: "Prada Paradoxe EDP",
      fragranceFamily: "Florals",
      scentType: "Warm Florals",
      notes: "Neroli Bud, White Amber, White Musk",
      description:
        "This is a floral, ambery perfume that reinvents freshness with a neroli bud extraction to capture the flower’s fresh scent, sensuality with bio-converted amber to reveal a vibrant warmth, and intensity through a revolutionary musk molecule for an intense yet subtle trail.",
      isLayerable: false,
      image: "./images/prada-paradoxe.jpg",
      id: "1",
    },

    {
      name: "Kayali Yum Boujee Marshmallow EDP",
      fragranceFamily: "Warm & Spicy",
      scentType: "Warm & Sweet Gourmands",
      notes: "Strawberry, Pink Marshmallow, Whipped Vanilla",
      description:
        "This fragrance features a delightful menu of mouthwatering notes, including fluffy pink marshmallow, succulent strawberry, flaky coconut, delicate freesia, whipped vanilla, and pink musk. Boujee, fluffy, and delicious, this luxurious scent will linger with sweet temptation with every spritz.",
      isLayerable: true,
      image: "./images/kayali-boujee-marsh.jpg",
      id: "2",
    },

    {
      name: "Valentino Donna Born in Roma EDP",
      fragranceFamily: "Florals",
      scentType: "Warm Florals",
      notes: "Blackcurrant, Jasmine Grandiflorum, Bourbon Vanilla",
      description:
        "Inspired by Rome, a place where past and present coexist, Born in Roma fragrances tell a story of self-expression: a celebration of people living freely, while embracing their heritage.",
      isLayerable: false,
      image: "./images/valentino-born-in-roma.jpg",
      id: "3",
    },

    {
      name: "Chanel Chance Eau Tendre EDP",
      fragranceFamily: "Florals",
      scentType: "Fruity Florals",
      notes: "Grapefruit, Quince, Rose Accord, White Musk",
      description:
        "An enhanced interpretation of the unexpected floral-fruity fragrance, CHANCE EAU TENDRE Eau de Parfum sweeps you into an intensified whirlwind of tenderness. The signature CHANCE bottle is reinvented with a silver cap and golden accent.",
      isLayerable: false,
      image: "./images/chanel-chance.jpg",
      id: "4",
    },

    {
      name: "DedCool Mochi Milk EDP",
      fragranceFamily: "Warm & Spicy",
      scentType: "Warm & Sweet Gourmands",
      notes: "Marshmallow, Vanilla Bean, Sweet Rice Milk",
      description:
        "Mochi Milk is the newest extension of DedCool’s MILK family of skin scents—fragrances that smell like you, only cozier. Mochi Milk is a sweeter, gourmand take on the warm notes found in both Milk and Xtra Milk. Think sweet rice milk, marshmallows, and vanilla. Words that describe Mochi Milk are sweet, whimsical, and nostalgic.",
      isLayerable: true,
      image: "./images/dedcool-mochi-milk.jpg",
      id: "5",
    },
  ]);

  function addFragranceCard(data) {
    //-data: adds data from input
    //-newcard: creates object
    // add a card, taking existing cards, and spreading a new card.
    console.log("data", data);
    const newId = nanoid(5);
    const newCard = {...data, id: newId};
    console.log(newCard);
    //function to return fragrance
    setFragrances([...fragrances, newCard])
  }
  //returning array without deleted card
  function deleteCard(id) {
    console.log("deleted", id);
    const updatedArray = fragrances.filter((setFragrances) => {
      return setFragrances.id !== id;
    });
    setFragrances(updatedArray);
  }
  //finding matching card, and copying
  function duplicateCard(id) {
    console.log("duplicated", id);
    const matchingFragrance = fragrances.find((setFragrances) => {
      return setFragrances.id === id;
    });
    const updatedFragrance = { ...matchingFragrance, id: nanoid() };
    setFragrances([...fragrances, updatedFragrance]);
  }
  // refesh button using DOM
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="page">
        <Masthead />
        <p className="item-count">
          My collection has {fragrances.length} fragrances.
        </p>
        <a>
          INSTRUCTIONS: To delete a fragrance card click 'trash' icon; to
          duplicate click 'copy' icon.
          <button className="resetButton" onClick={refreshPage}>
            Reset Cards 💫
          </button>
        </a>

        <div className="collection">
          {/* a place for my fragrance collection*/}
          {/* use ItemCard component in loop */}
          {fragrances.map((favFragrance) => {
            return (
              <ItemCard
                key={favFragrance.id}
                deleteFunction={deleteCard}
                duplicateFunction={duplicateCard}
                {...favFragrance}
              />
            );
          })}
        </div>
        {/**form */}
       <NewCardForm addCardFn={addFragranceCard}/>
        {/**form */}
      </div>
    </>
  );
}

export default App;
