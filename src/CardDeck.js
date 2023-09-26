import React, {useState, useEffect} from "react";
import DrawCard from "./DrawCard";
import axios from "axios";
import "./CardDeck.css"

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

const CardDeck = () => {
    const [card, setCard] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    useEffect(() => {
        async function drawACard() {
            const res = await axios.get(`${API_BASE_URL}/new/shuffle`);
            setCard(res.data);
        }
        drawACard();
    }, []);

  async function draw() {
    try {
        const drawRes = await axios.get(`${API_BASE_URL}/${card.deck_id}/draw/`);
  
        if (drawRes.data.remaining === 0) throw new Error("Deck empty!");
  
        const drawnCard = drawRes.data.cards[0];
  
        setDrawn(res => [
          ...res,
          {
            id: drawnCard.code,
            name: drawnCard.suit + " " + drawnCard.value,
            image: drawnCard.image,
          },
        ]);
      } catch (err) {
        alert(err);
      }
  }

  async function shuffle() {
    setIsShuffling(true);
    try {
      await axios.get(`${API_BASE_URL}/${card.deck_id}/shuffle/`);
      setDrawn([]);
    } catch (err) {
      alert(err);
    } finally {
      setIsShuffling(false);
    }
  }

  function drawBtn() {
    if (!card) return null;

    return (
      <button
        className="CardDeck-gimme"
        onClick={draw}
        disabled={isShuffling}>
        DRAW
      </button>
    );
  }

  function shuffleBtn() {
    if (!card) return null;
    return (
      <button
        className="Deck-gimme"
        onClick={shuffle}
        disabled={isShuffling}>
        SHUFFLE DECK
      </button>
    );
  }

  return (
    <main className="CardDeck">

      {drawBtn()}
      {shuffleBtn()}

      <div className="CardDeck-cardarea">{
        drawn.map(c => (
          <DrawCard key={c.id} name={c.name} image={c.image} />
        ))}
      </div>

    </main>
  );


}

export default CardDeck;