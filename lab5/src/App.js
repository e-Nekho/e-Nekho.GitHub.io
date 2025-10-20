import { useState, useMemo, useEffect } from 'react'
import { useServicePicker } from './Hooks/PickServices';
import Header from './Components/Header/Header'
import Main from './Components/Main/Main';
import './App.css';


function App() {
  const category = [
    {id: 0, name: 'Сюрприз'   },
    {id: 1, name: 'Мармелад' },
    {id: 2, name: 'Шоколад'  },
    {id: 3, name: "Фрукты"   }
  ];
  const typesMarmalade =[
    { id: 1, name: 'Яблоко'},
    { id: 2, name: 'Вишня'},
    { id: 3, name: 'Малина'},
    { id: 4, name: 'Апельсин'}
  ];
  const typesChocolate = [
    { id: 1, name: 'Молочный'},
    { id: 2, name: 'Горький'},
    { id: 3, name: 'Белый'}
  ];
  const bonus = [
    {id: 1, name: 'Упаковка',   value: 5  },
    {id: 2, name: 'Доставка',   value: 15 },
    {id: 3, name: 'Приоритет',  value: 7.5  } 
  ];
  
  const strange = [
    {id: 1, logo: '', name: 'Случайный бокс №1', price: 49.90,    discount: 0, count: 0},
    {id: 2, logo: '', name: 'Случайный бокс №2', price: 499.90,   discount: 0, count: 0},
    {id: 3, logo: '', name: 'Случайный бокс №3', price: 4999.90,  discount: 0, count: 0}
  ];
  const marmalade = [
    { id: 1, logo: process.env.PUBLIC_URL + '/images/marmalade-strips.jpg',   name: 'Ленточки кислые',      price: 99.99,   discount: 0,  count: 0 },
    { id: 2, logo: process.env.PUBLIC_URL + '/images/gummy-bears.avif',       name: 'мармеладные мишки',    price: 49.99,    discount: 5,  count: 0 },
    { id: 3, logo: process.env.PUBLIC_URL + '/images/marmalade-peppers.png',  name: 'перчики острые',       price: 124.99,   discount: 0,  count: 0 },
    { id: 4, logo: process.env.PUBLIC_URL + '/images/marmalade-worms.jpg',    name: 'мармеладные червячки', price: 109.99,   discount: 15, count: 0 },
    { id: 5, logo: process.env.PUBLIC_URL + '/images/valera-the-bear.jpg',    name: 'Медведь Валера',       price: 999.99,  discount: 50, count: 0 }
  ];
  const chocolate = [
    { id: 1, logo: '', name: 'Классический',  price: 99.99,   discount: 0,  count: 0},
    { id: 2, logo: '', name: 'Воздушный',     price: 119.99,  discount: 0,  count: 0},
    { id: 3, logo: '', name: 'Карамель',      price: 114.99,  discount: 45,  count: 0},
    { id: 4, logo: '', name: 'Клубника',      price: 114.99,  discount: 10, count: 0},
    { id: 5, logo: '', name: 'Арахис',        price: 114.99,  discount: 0,  count: 0},
    { id: 6, logo: '', name: 'Фундук',        price: 114.99,  discount: 15, count: 0},
    { id: 7, logo: '', name: 'Арбуз',         price: 169.99,  discount: 0,  count: 0},
  ];
  const fruits = [
    { id: 1, logo: '', name: 'Яблоки',    price: 49.99, discount: 0,  count: 0},
    { id: 2, logo: '', name: 'Груши',     price: 49.99, discount: 0,  count: 0},
    { id: 3, logo: '', name: 'Абрикосы',  price: 69.99, discount: 45,  count: 0},
    { id: 4, logo: '', name: 'Бананы',    price: 74.99, discount: 10, count: 0},
  ];

  const {
    picked,
    addService,
    removeService,
    removeSubService,
    removeServiceById,
    updateSubServiceCount,
    clearServices,
    getService,
    getSubService,
    getTotalCount,
    getTotalPrice,
    getRawTotalPrice
  } = useServicePicker();

  const servicePicker = {
    picked,
    addService,
    removeService,
    removeSubService,
    removeServiceById,
    updateSubServiceCount,
    clearServices,
    getService,
    getSubService,
    getTotalCount,
    getTotalPrice,
    getRawTotalPrice
  }

  return (
    <div className="App">
      <Header />
      <Main 
      categories={category}
      rawServices={[strange, marmalade, chocolate, fruits]}
      typesMarmalade={typesMarmalade}
      typesChocolate={typesChocolate}
      bonuses={bonus}
      servicePicker={servicePicker}
      pickedServices={picked}
      onAddClick={addService}
      onRemoveClick={removeService}
      onSubRemoveClick={removeSubService}
      />
    </div>
  );
}

export default App;
