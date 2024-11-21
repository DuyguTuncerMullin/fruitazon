// import { Component } from 'react';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import FruitList from './FruitList';

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
  categories: string[];
}

const ProductsPage = () => {
  const [fruitData, setFruitData] = useState<FruitData[]>([]);
  const [seachTerm, setSearchTerm] = useState<string>('');
  const [sortedItems, setSortedItems] = useState<FruitData[]>([]);
  const [selectedCategories, setselectedCategories] = useState<
  FruitData['categories']
  >([]);

  useEffect(() => {
    const fetchFruitData = async () => {
      const response = await fetch(
        `http://localhost:3001/api/fruits?search=${seachTerm}`,
      );
      const data = await response.json();
      console.log('data', data);
      setFruitData(data);
    };
    fetchFruitData();
  }, [seachTerm]);

  useEffect(() => {
    setSortedItems(fruitData);
  }, [fruitData]);

  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === 'price-lo-hi') {
      setSortedItems([...fruitData].sort((a, b) => a.price - b.price));
    } else if (value === 'price-hi-lo') {
      setSortedItems([...fruitData].sort((a, b) => b.price - a.price));
    } else if (value === 'avg-rating') {
      setSortedItems([...fruitData].sort((a, b) => b.stars - a.stars));
    }
  };

  const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setselectedCategories([...selectedCategories, name]);
    } else {
      setselectedCategories(
        selectedCategories.filter((item) => {
          return item !== name;
        }),
      );
    }
  };

  const filteredItems = sortedItems.filter((item) => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.every((category) => {
      return item.categories.includes(category);
    });
  });

  return (
    <PageContainer>
      <Sidebar>
        <div>
          <h3>Categories</h3>
          <div>
            <input name="domestic" type="checkbox" onChange={categoryHandler} />
            <label>Domestic</label>
          </div>
          <div>
            <input name="exotic" type="checkbox" onChange={categoryHandler} />
            <label>Exotic</label>
          </div>
          <div>
            <input name="sweet" type="checkbox" onChange={categoryHandler} />
            <label>Sweet</label>
          </div>
          <div>
            <input name="tangy" type="checkbox" onChange={categoryHandler} />
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Sort By</label>
            <select name="choice" onChange={sortHandler}>
              <option value="price-lo-hi">Price: Low to High</option>
              <option value="price-hi-lo">Price: High to Low</option>
              <option value="avg-rating">Average Rating</option>
            </select>
          </div>
        </TopbarContainer>
        {/* <div>Product listings go here</div> */}
        <div className="main-container">
          {filteredItems.map(({ id, name, emoji, stars, price }) => (
            <FruitList
              key={id}
              name={name}
              emoji={emoji}
              price={price}
              stars={stars}
            />
          ))}
        </div>
      </Content>
    </PageContainer>
  );
};

export default ProductsPage;
