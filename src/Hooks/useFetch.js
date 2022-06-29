// poderia ser realizado um fetch onde fosse necessário, sempre que fosse preciso
// porém para ter valores armarenados em estados reativos, como controle de erros
// e também a reutilização de código, foi criado esse custom hook
// evitando erros de digitação como o tratamento de requisições asincronas

import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // baseada na explicação do Origamid
  // Permite definirmos um callback e uma lista de dependências do callback.
  // Esse callback só será recriado se essa
  // lista de dependências for modificada, caso contrário ele não irá recriar o callback.
  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  // exportado os 3 estados reativos e a função de fetch reescrita
  return { data, error, loading, request };
};

export default useFetch;
