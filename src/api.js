// Esse arquivo é um facilitador, o qual guarda a url de acesso em uma variável
// dessa forma, basta importar a variavel em qualquer arquivo
export const API_URL = 'https://dogsapi.origamid.dev/json';

// solicitações json padronizadas de forma que seja fácil realizá-las quando necessário
// reuso de código, assim nao é necessário digitar sempre as requisições

// login no site baseado no na informaçao passada no body
export function TOKEN_POST(body) {
  return {
    url: API_URL + '/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

// validacao se o token é valido
export function TOKEN_VALIDATE_POST(token) {
  return {
    url: API_URL + '/jwt-auth/v1/token/validate',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

// pega as informações do usuário baseado em seu token
export function USER_GET(token) {
  return {
    url: API_URL + '/api/user',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

// gravar um novo usuário
export function USER_POST(body) {
  return {
    url: API_URL + '/api/user',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

// posta uma foto
export function PHOTO_POST(formData, token) {
  return {
    url: API_URL + '/api/photo',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    },
  };
}
// realiza o fetch que buscas as photos a serem apresentadas no feed
export function PHOTOS_GET({ page, total, usuario }) {
  return {
    url: `${API_URL}/api/photo/?_page=${page}&_total=${total}&_user=${usuario}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
}

// busca uma foto em especifico, baseado em seu id
export function PHOTO_GET(id) {
  return {
    url: `${API_URL}/api/photo/${id}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
}

export function COMMENT_POST(id, body, token) {
  return {
    url: `${API_URL}/api/comment/${id}`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      cache: 'no-store',
      body: JSON.stringify(body),
    },
  };
}
