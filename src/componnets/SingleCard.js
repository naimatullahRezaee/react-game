import "./SingleCard.css";
export default function SingleCard(props) {
  const handleClick = () => {
    if (!props.disabled) {
      props.handleChoice(props.card);
    }
  };
  return (
    <div className="card">
      <div className={props.flipped ? "flipped" : ""}>
        <img src={props.card.src} className="front" alt="card fornt" />
        <img
          onClick={handleClick}
          src="img/cover.png"
          className="back"
          alt="card cover"
        />
      </div>
    </div>
  );
}
