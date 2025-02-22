import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './Pokedex.css';

const Pokedex = () => {
  const [userPokemons, setUserPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchUserPokemons = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Get user's pokemon collectionusing auth0Id
        const response = await axios.get(`http://localhost:3000/pokemons/user/${user.sub}`);
        console.log ('Pokemon collection response:', response.data);
       
        if (response.data) {
          setUserPokemons(response.data);
        } else{
          setUserPokemons([]);
        }
      } catch (err) { 
        console.error('Error details:', err.response?.data); 
        setError(err.response?.data?.error || 'Failed to load Pokémon collection');
      } finally {
        setLoading(false);  
      }
    };
    fetchUserPokemons();
  }, [user]);

  if (loading) return <div>Loading your Pokédex...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userPokemons.length) return <div>No Pokémon in your collection yet!</div>;

  const itemsPerPage = 25; // 5x5 grid
  const currentPokemons = userPokemons.slice(0, itemsPerPage);
  const emptySlots = itemsPerPage - currentPokemons.length;

  return (
    <div className="pokedex-container">
      <h3>My Pokémons</h3>
      <div className="pokemon-list">
        {userPokemons.map(userPokemon => (
          <div key={userPokemon.id} className="pokemon-card">
            {userPokemon.Pokemon && (
              <>
                <img 
                  src={userPokemon.Pokemon.imgsrc}
                  alt={userPokemon.Pokemon.name}
                  className="pokemon-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-pokemon.png';
                  }}
                />
                <div className="pokemon-info">
                  <h3>{userPokemon.Pokemon.name}</h3>
                  <p>Rarity: {userPokemon.Pokemon.rarity}</p>
                </div>
              </>
            )}
          </div>
        ))}
         {/* Fill empty slots with placeholder cards */}
         {[...Array(emptySlots)].map((_, index) => (
          <div key={`empty-${index}`} className="pokemon-card empty" />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;