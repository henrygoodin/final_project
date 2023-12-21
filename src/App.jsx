import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import AddGame from './Components/AddGame'; // Assuming you have a component for adding games
import Game from './Components/Game'; // Assuming you have a component for displaying games
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { games } from './Components/gamesData';
 
function App() {
  const [allGames, setAllGames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const games = [{
    id: nanoid(),
    title: "NBA 2k20",
    price: "26.47",
    description: "NBA 2K20: Immersive basketball gaming experience with realistic graphics and engaging modes. Create your player, explore MyCareer, MyTeam, and more. Play now",
    image: 'Images/2k20.jpg',
  }, {
    id: nanoid(),
    title: "Borderland",
    price: "9.69",
    description: "Borderlands: Action-packed shooter with humor and loot. Explore diverse worlds, team up with friends, and face wild enemies. Get ready for mayhem!",
    image: 'Images/borderland.jpg',
  }, {
    id: nanoid(),
    title: "Mortal Kombat",
    price: "59.99",
    description: "Mortal Kombat: Iconic fighting game with brutal combat and legendary characters. Test your skills in intense battles and unleash powerful fatalities. Finish him!",
    image: 'Images/mortalkombat.jpg',
  }, {
    id: nanoid(),
    title: "Star Wars",
    price: "36.99",
    description:
      "Star Wars Game: Immerse yourself in the galaxy far, far away. Epic battles, iconic characters, and the Force await in this thrilling Star Wars adventure. Join the battle!",
    image: 'Images/starwars.jpg',
  }, {
    id: nanoid(),
    title: "Street Fighter",
    price: "45.99",
    description: "Street Fighter: Classic fighting game excitement with iconic characters and intense martial arts battles. Master special moves and combos in this legendary arcade experience. Fight to be the champion!",
    image: 'Images/streetfighter.jpg',
  }, {
    id: nanoid(),
    title: "Super Mario",
    price: "54.75",
    description:
      "Super Mario: Jump into the iconic world of Mario, filled with colorful adventures, power-ups, and challenging levels. Join the mustachioed plumber on a quest to save Princess Peach from the clutches of Bowser. It's time for classic gaming fun!",
    image: 'Images/supermario.jpg',
  }, 
  ];


  useEffect(() => {
    const gamesLocalStorage = JSON.parse(localStorage.getItem('games')) || games;
    setAllGames(gamesLocalStorage);
    setSearchResults(gamesLocalStorage);
  }, []);
  

  const saveGames = (games) => {
    setAllGames(games);
    setSearchResults(games);

    if (localStorage) {
      localStorage.setItem('games', JSON.stringify(games));
      console.log('Saved to local storage');
    }
  }

  const addGame = (newGame) => {
    const updatedGames = [...allGames, newGame];
    saveGames(updatedGames);
  }
//Function for searching games//
  const searchGames = () => {
    console.log('button is clicked!.')
    let keywordsArray = [];
  
    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(' ');
    }
  
    if (priceFilter) {
      keywordsArray.push(priceFilter.toString());
    }
  
    if (keywordsArray.length > 0) {
      const searchResults = allGames.filter((game) => {
        for (const word of keywordsArray) {
          if (
            game.title.toLowerCase().includes(word) ||
            game.description.toLowerCase().includes(word) ||
            (game.price === parseFloat(word))
          ) {
            return true;
          }
        }
        return false;
      });
  
      setSearchResults(searchResults);
    } else {
      setSearchResults(allGames);
    }
  };
  

  const removeGame = (gameToDelete) => {
    const updatedGamesArray = allGames.filter(game => game.id !== gameToDelete.id);
    saveGames(updatedGamesArray);
  }

  const updateGame = (updatedGame) => {
    const updatedGamesArray = allGames.map(game => game.id === updatedGame.id ? { ...game, ...updatedGame } : game);
    saveGames(updatedGamesArray);
  }

  return (
    <div className="container bg-light">
      {/* Search bar at the top */}
      <header>
        <h1>Video Game Store</h1>
      </header>

      <nav>
        <a href="#">Home</a>
        <a href="#">Games</a>
        <a href="#">Consoles</a>
        <a href="#">Accessories</a>
        <a href="#">Contact</a>
      </nav>

      <div className="row mt-4" id="searchGames">
        <div className="col-md-6">
          <h3>Game Search</h3>
          <label htmlFor="txtKeywords">Search by Title or Description:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter keywords"
            onChange={(evt) => setKeywords(evt.currentTarget.value)}
            value={keywords}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="txtPrice">Filter by Price:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter price"
            onChange={(evt) => setPriceFilter(evt.currentTarget.value)}
            value={priceFilter}
          />
        </div>
        <div className="col-md-2">
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={searchGames}
          >
            Search <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      {/* Display all games with Game component */}
      <div className="row">
        {allGames.map((game) => (
          <div className="col-md-4" key={game.id}>
            <Game game={game} removeGame={removeGame} updateGame={updateGame} />
          </div>
        ))}
      </div>

      <AddGame addGame={addGame} />
      <footer className="text-white text-center"> © 2023 Video Game Store</footer>
    </div>
  );
}

export default App;