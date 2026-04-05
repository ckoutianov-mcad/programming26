 import { useState } from "react";
 import { nanoid } from "nanoid";
 import Masthead from "../Masthead/Masthead";
 import ItemCard from "../ItemCard/ItemCard";
import fragranceCollection from "../assets/fragrance-data.json"

 export function Home() {
   //wrapping array in useState
   const [fragrances, setFragrances] = useState(fragranceCollection);
   function addFragranceCard(data) {
     //-data: adds data from input
     //-newcard: creates object
     // add a card, taking existing cards, and spreading a new card.
     console.log("data", data);
     const newId = nanoid(5);
     const newCard = { ...data, id: newId };
     console.log(newCard);
     //function to return fragrance
     setFragrances([...fragrances, newCard]);
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
     </div>
   );
 }