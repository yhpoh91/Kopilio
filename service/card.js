const createCardUrl = (columnId, cardId) => `http://localhost:3000/cards/${cardId || ""}?columnId=${columnId}`;

const listCards = async columnId => {
  try {
    const url = createCardUrl(columnId);
    const cards = await api.request(api.GET, url);
    return Promise.resolve(cards);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createCard = async (columnId, cardData) => {
  try {
    const url = createCardUrl(columnId);
    const card = await api.request(api.POST, url, { ...cardData, columnId });
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getCard = async (columnId, cardId) => {
  try {
    const url = createCardUrl(columnId, cardId);
    const card = await api.request(api.GET, url);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateCard = async (columnId, cardId, cardData) => {
  try {
    const url = createCardUrl(columnId, cardId);
    const card = await api.request(api.PUT, url, { ...cardData, columnId });
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const removeCard = async (columnId, cardId) => {
  try {
    const url = createCardUrl(columnId, cardId);
    await api.request(api.DELETE, url);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

cardService = {
  listCards,
  createCard,
  getCard,
  updateCard,
  removeCard
};
