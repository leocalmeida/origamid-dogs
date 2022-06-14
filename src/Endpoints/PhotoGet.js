import React from 'react';
import URL from './URL';

const PhotoGet = () => {
  const [fotoId, setFotoId] = React.useState('');
  function handleSubmit(event) {
    event.preventDefault();

    fetch(`${URL}/api/photo/${fotoId}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        return json;
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={fotoId}
        onChange={({ target }) => setFotoId(target.value)}
      />
      <button>Enviar</button>
    </form>
  );
};

export default PhotoGet;
