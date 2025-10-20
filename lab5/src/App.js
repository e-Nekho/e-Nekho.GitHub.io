import {useState, useMemo, useEffect} from 'react'
import PickedServices from './Hooks/PickedServices';
import Header from './Components/Header/Header'
import Main from './Components/Main/Main';
import './App.css';

function App() {
  const category = [
    {id: 0, name: 'Секрет'   },
    {id: 1, name: 'Мармелад' },
    {id: 2, name: 'Шоколад'  },
    {id: 3, name: "Фрукты"   }
  ];
  const typesMarmalade =[
    { id: 1, type: 'Яблоко'},
    { id: 2, type: 'Вишня'},
    { id: 3, type: 'Малина'},
    { id: 4, type: 'Апельсин'}
  ];
  const typesChocolate = [
    { id: 1, type: 'Молочный'},
    { id: 2, type: 'Горький'},
    { id: 3, type: 'Белый'}
  ];
  const bonus = [
    {id: 1, name: 'Упаковка',   value: 5  },
    {id: 2, name: 'Доставка',   value: 10 },
    {id: 3, name: 'Приоритет',  value: 3  } 
  ];
  
  const strange = [
    {id: 1, logo: '', name: 'Случайный бокс №1', price: 50, discount: 0, count: 0},
    {id: 2, logo: '', name: 'Случайный бокс №2', price: 500, discount: 0, count: 0},
    {id: 3, logo: '', name: 'Случайный бокс №3', price: 5000, discount: 0, count: 0}
  ];
  const marmalade = [
    { id: 1, logo: process.env.PUBLIC_URL + '/images/marmalade-strips.jpg',   name: 'Ленточки кислые',      price: 100,   discount: 0,  count: 0 },
    { id: 2, logo: process.env.PUBLIC_URL + '/images/gummy-bears.avif',       name: 'мармеладные мишки',    price: 50,    discount: 5,  count: 0 },
    { id: 3, logo: process.env.PUBLIC_URL + '/images/marmalade-peppers.png',  name: 'перчики острые',       price: 125,   discount: 0,  count: 0 },
    { id: 4, logo: process.env.PUBLIC_URL + '/images/marmalade-worms.jpg',    name: 'мармеладные червячки', price: 110,   discount: 15, count: 0 },
    { id: 5, logo: process.env.PUBLIC_URL + '/images/valera-the-bear.jpg',    name: 'Медведь Валера',       price: 1000,  discount: 50, count: 0 }
  ];
  const chocolate = [
    { id: 1, logo: '', name: 'Классический',  price: 100, discount: 0,  count: 0},
    { id: 2, logo: '', name: 'Воздушный',     price: 120, discount: 0,  count: 0},
    { id: 3, logo: '', name: 'Карамель',      price: 115, discount: 45,  count: 0},
    { id: 4, logo: '', name: 'Клубника',      price: 115, discount: 10, count: 0},
    { id: 5, logo: '', name: 'Арахис',        price: 115, discount: 0,  count: 0},
    { id: 6, logo: '', name: 'Фундук',        price: 115, discount: 15, count: 0},
    { id: 7, logo: '', name: 'Арбуз',         price: 170, discount: 0,  count: 0},
  ];
  const fruits = [

  ];

  const picked = PickedServices();

  const total = useMemo(() => {
    return picked.picked.reduce((acc, service) => acc + service.total, 0)
  },[picked]);

  return (
    <div className="App">
      <Header />
      <Main 
      categories={category}
      rawServices={[strange, marmalade, chocolate, fruits]}
      typesMarmalade={typesMarmalade}
      typesChocolate={typesChocolate}
      bonuses={bonus}
      pickedServices={picked}
      total={total}
      />
    </div>
  );
}

export default App;
