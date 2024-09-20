// import { Component } from 'react';
import styled from '@emotion/styled';
import FruitList from './FruitList';
import { useState, useEffect } from 'react';

const PageContainer = styled.div({
  marginTop: 110,
  display: 'flex',
});

const Sidebar = styled.div({
  border: '1px solid #92979b',
  paddingLeft: 30,
  margin: 20,
  width: '15rem',
  height: '70vh',
});

const Content = styled.div({
  margin: 20,
  width: '100%',
});

const TopbarContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '2rem',
});

interface FruitData {
  id: number;
  name: string;
  emoji: string;
  stars: number;
  price: number;
  categories: string[]
}

const ProductsPage: React.FC<FruitData> = () => {
  const [seachTerm, setSearchTerm] = useState('');
  const [fruitData, setFruitData] = useState<FruitData[]>([]);
  const [sortedArray, setSortedArray] = useState(fruitData);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3001/api/fruits?search=${seachTerm}`,
      );
      const data = await response.json();
      console.log('data', data);
      setFruitData(data);
      console.log('seachTerm', seachTerm);
    };
    fetchData();
  }, [seachTerm]);

  useEffect(() => {
    setSortedArray(fruitData); // Sync sortedArray with fruitData
  }, [fruitData]);

  const inputFiledHandler = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const sortedFruitData = (array: any) => {
    return [...array].sort((a, b) => a.price - b.price);
  };

  const handleSortChange = (e: any) => {
    const value = e.target.value;
    let sortedData = [];

    if (value === 'price-lo-hi') {
      sortedData = sortedFruitData(fruitData);
    } else if (value === 'price-hi-lo') {
      sortedData = sortedFruitData(fruitData).reverse();
    } else if (value === 'avg-rating') {
      sortedData = [...fruitData].sort((a, b) => b.stars - a.stars);
    }

    setSortedArray(sortedData);
  };

  const handleCategoryChange = (e: any) => {
    const { name, checked } = e.target;
    setSelectedCategories((prevSelectedCategories) => 
      checked 
        ? [...prevSelectedCategories, name] 
        : prevSelectedCategories.filter((category) => category !== name)
    );
  };

  const filteredFruitData = sortedArray.filter((fruit) => {
    if (selectedCategories.length === 0) return true; // No category filter applied
    return selectedCategories.every((category) => fruit.categories.includes(category));
  });


  return (
    <PageContainer>
      <Sidebar>
        <div>
          <h3>Categories</h3>
          <div>
            <input name="domestic" type="checkbox"  onChange={handleCategoryChange}/>
            <label>Domestic</label>
          </div>
          <div>
            <input name="exotic" type="checkbox"  onChange={handleCategoryChange}/>
            <label>Exotic</label>
          </div>
          <div>
            <input name="sweet" type="checkbox"  onChange={handleCategoryChange}/>
            <label>Sweet</label>
          </div>
          <div>
            <input name="tangy" type="checkbox"  onChange={handleCategoryChange}/>
            <label>Tangy</label>
          </div>
        </div>
      </Sidebar>
      <Content>
        <TopbarContainer>
          <div>
            <label>Search</label>
            <input
              name="search"
              type="search"
              value={seachTerm}
              onChange={inputFiledHandler}
            />
          </div>
          <div>
            <label>Sort By</label>
            <select name="choice" onChange={handleSortChange}>
              <option value="price-lo-hi">Price: Low to High</option>
              <option value="price-hi-lo">Price: High to Low</option>
              <option value="avg-rating">Average Rating</option>
            </select>
          </div>
        </TopbarContainer>
        {/* <div>Product listings go here</div> */}
        <div className="main-container">
          {filteredFruitData.map(({ id, name, emoji, stars, price }) => (
            <FruitList
              key={id}
              id={id}
              name={name}
              emoji={emoji}
              stars={stars}
              price={price}
            />
          ))}
        </div>
      </Content>
    </PageContainer>
  );
};

export default ProductsPage;
