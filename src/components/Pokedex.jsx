import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './Pokedex.css';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth0();
  const itemsPerPage = 25;
 // 5x5 grid

 useEffect(() => {
  const fetchUserPokemons = async () => {
    try {
      setLoading(true);
      setError(null);
      // First get the user's database ID using auth0Id
      const userResponse = await axios.get(`http://localhost:3000/users/auth/${user.sub}`);

      console.log('User response:', userResponse.data); // Debug user data

      const userId = userResponse.data.id;
      console.log(userId)
      // Then fetch their pokemons using the database ID
      const pokemonsResponse = await axios.get(`http://localhost:3000/users/${user.sub}/pokemons`);
      console.log('Pokemon response:', pokemonsResponse.data); // Debug pokemon data
      setPokemons(pokemonsResponse.data);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      setError('Failed to load your Pokémon collection. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    fetchUserPokemons();
  }
}, [user]);

  // Calculate pagination
  const totalPages = Math.ceil(pokemons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPokemons = pokemons.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="pokedex-container">
      <h2>My Pokédex</h2>
      <div className="pokemon-grid">
        {currentPokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
           <img 
                src={pokemon.Pokemon?.imgsrc || pokemon.imgsrc} 
                alt={pokemon.Pokemon?.name || pokemon.name}
                className="pokemon-image"
              />
            <h3>{pokemon.Pokemon?.name || pokemon.name}</h3>
              <p className="rarity">{pokemon.Pokemon?.rarity || pokemon.rarity}</p>
            </div>
        ))}
        {/* Fill empty slots with placeholder cards */}
        {[...Array(itemsPerPage - currentPokemons.length)].map((_, index) => (
          <div key={`empty-${index}`} className="pokemon-card empty"></div>
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage} / {totalPages || 1}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pokedex;