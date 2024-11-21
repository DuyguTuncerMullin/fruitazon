interface FruitListProps {
  name: string;
  emoji: string;
  stars: number;
  price: number;
}

const FruitList: React.FC<FruitListProps> = ({ name, emoji, stars, price }) => {
  return (
    <div className="list-item">
      <span className="emoji">{emoji}</span>
      <div className="product-details">
        <span>{name}</span>
        <span>{price}</span>
        <span>Avg. rating: {stars}</span>
      </div>
    </div>
  );
};

export default FruitList;
