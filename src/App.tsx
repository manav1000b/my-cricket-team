import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Player, Role, Team } from './types';

function App() {
  // const [team, SetTeam] = useState<Team>({
  //   players: new Array<Player>(15)
  // });

  const [team, SetTeam] = useState<Team>({
    players: []
  });

  const AddPlayer = () =>
    SetTeam({
      players: team.players.concat([
        {
          name: '',
          roles: [],
          selected: false,
          captain: false
        }
      ])
    });
  return (
    <div className='App'>
      {team.players.map((player: Player, index: number) => (
        <div className='jj'>
          <span>{index + 1}</span>
          <input
            type='checkbox'
            checked={player.captain}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.currentTarget.checked && team.players.filter((p) => p.captain).length === 1) {
                alert('max 1 captain');
                return;
              } else
                SetTeam({
                  players: team.players.map((pl, i) => (i === index ? { ...pl, captain: event?.currentTarget.checked } : pl))
                });
            }}
          />
          <input
            tabIndex={index}
            type={'text'}
            placeholder='Name'
            value={player.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const p = player;
              p.name = event.currentTarget.value;
              SetTeam({
                players: team.players.map((pl, i) => (i === index ? p : pl))
              });
            }}
          />
          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              const p = player;
              p.roles.push(event.currentTarget.value as Role);
              SetTeam({
                players: team.players.map((pl, i) => (i === index ? p : pl))
              });
            }}
            value=''
          >
            <option disabled value=''>
              Select
            </option>
            {!player.roles.includes('Batsman') && <option value={'Batsman'}>Batsman</option>}
            {!player.roles.includes('Bowler') && <option value={'Bowler'}>Bowler</option>}
            {!player.roles.includes('WicketKeeper') && <option value={'WicketKeeper'}>WicketKeeper</option>}
          </select>
          <button
            type='button'
            title='Remove'
            onClick={() =>
              SetTeam({
                players: team.players.filter((pl, i) => i !== index)
              })
            }
          >
            Remove
          </button>
          {player.roles.map((role) => (
            <>
              <span>{role}</span>
              <button
                type='button'
                title='Remove'
                onClick={() => {
                  SetTeam({
                    players: team.players.map((pl, i) => (i === index ? { ...pl, roles: pl.roles.filter((r) => r !== role) } : pl))
                  });
                }}
              >
                x
              </button>
            </>
          ))}

          <input
            type='checkbox'
            name='player-selected'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.currentTarget.checked && team.players.filter((p) => p.selected).length > 14) {
                alert('max 14 players');
                return;
              }
              SetTeam({
                players: team.players.map((pl, i) => (i === index ? { ...pl, selected: event.currentTarget.checked } : pl))
              });
            }}
            checked={player.selected}
          />
        </div>
      ))}
      <button type='button' title='Add' onClick={AddPlayer}>
        Add Player
      </button>
    </div>
  );
}

export default App;
