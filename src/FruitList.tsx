interface FruitListProps {
  id: number;
  name: string;
  emoji: string;
  stars: number;
  price: number;
}

const FruitList: React.FC<FruitListProps> = ({
  id,
  name,
  emoji,
  stars,
  price,
}) => {
  return (
      <ul className="container">
        <li key={id} className="fruit-box">
          <span className={'emoji'}>{emoji}</span>
          <p>{name}</p>
          <p>{price}</p>
          <p>Avg. rating: {stars}</p>
        </li>
      </ul>
  );
};

export default FruitList;
