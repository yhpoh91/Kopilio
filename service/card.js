const createUrl = (columnId, cardId) =>
  `http://localhost:3000/columns/${columnId}/cards/${cardId || ""}`;

const list = columnId => {
  try {
    const url = createUrl(columnId);
    const cards = await api.request(api.GET, url);
    return Promise.resolve(cards);
  } catch (error) {
    return Promise.reject(error);
  }
};

const create = (columnId, cardData) => {
  try {
    const url = createUrl(columnId);
    const card = await api.request(api.POST, url, cardData);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const get = (columnId, cardId) => {
  try {
    const url = createUrl(columnId, cardId);
    const card = await api.request(api.GET, url);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const update = (columnId, cardId, cardData) => {
  try {
    const url = createUrl(columnId, cardId);
    const card = await api.request(api.PUT, url, cardData);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const remove = (columnId, cardId) => {
  try {
    const url = createUrl(columnId, cardId);
    await api.request(api.DELETE, url);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

columnService = {
  list,
  create,
  get,
  update,
  remove
};
