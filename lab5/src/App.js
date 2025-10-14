import {useState, useMemo, useEffect} from 'react'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main';
import './App.css';

function App() {
  const category = [
    {id: 1, name: 'Секрет'   },
    {id: 2, name: 'Мармелад' },
    {id: 3, name: 'Шоколад'  },
    {id: 4, name: "Фрукты"   }
  ];
  const typesMarmalade =[
    'Яблоко',
    'Вишня',
    'Малина',
    'Апельсин'
  ];
  const typesChocolate = [
    'Молочный',
    'Горький',
    'Белый'
  ];
  const bonus = [
    {id: 1, name: 'Упаковка',   percentage: 5  },
    {id: 2, name: 'Доставка',   percentage: 10 },
    {id: 3, name: 'Приоритет',  percentage: 3  } 
  ];
  
  const strange = [

  ];
  const marmalade = [
    { id: 1, logo: './images/marmalade-strips.jpg',   name: 'Ленточки кислые',      price: 100,   discount: 0,  count: 0 },
    { id: 2, logo: './images/gummy-bears.avif',       name: 'мармеладные мишки',    price: 50,    discount: 5,  count: 0 },
    { id: 3, logo: './images/marmalade-peppers.png',  name: 'перчики острые',       price: 125,   discount: 0,  count: 0 },
    { id: 4, logo: './images/marmalade-worms.jpg',    name: 'мармеладные червячки', price: 110,   discount: 15, count: 0 },
    { id: 5, logo: './images/valera-the-bear.jpg',    name: 'Медведь Валера',       price: 1000,  discount: 50, count: 0 }
  ];
  const chocolate = [

  ];
  const fruits = [

  ];

  const [picked, setPicked] = useMemo([]);
  const total = useMemo(() => {
    return picked.reduce((acc, service) => acc + service.total, 0)
  },[picked]);


  return (
    <div className="App">
      <Header />
      <Main 
      categories={category}
      rawServices={[strange, marmalade, chocolate, fruits]}/>
    </div>
  );
}

export default App;
