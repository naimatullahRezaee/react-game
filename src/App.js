import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./componnets/SingleCard";

const cardImages = [
  { src: "./img/helmet-1.png", matched: false },
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/ring-1.png", matched: false },
  { src: "./img/scroll-1.png", matched: false },
  { src: "./img/shield-1.png", matched: false },
  { src: "./img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [disabled, setDesabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoice1(null);
    setChoice2(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle choice

  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card);
  };
  // compare two selected card
  useEffect(() => {
    if (choice1 && choice2) {
      setDesabled(true);
      if (choice1.src === choice2.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choice1.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choice1, choice2]);

  // reset choices adn increase turn

  const resetTurn = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns((preTurn) => preTurn + 1);
    setDesabled(false);
  };
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={cards.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choice1 || card === choice2 || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
