const createUrl = columnId => `http://localhost:3000/columns/${columnId || ""}?_embed=cards`;

const list = async () => {
  try {
    const url = createUrl();
    const columns = await api.request(api.GET, url);
    return Promise.resolve(columns);
  } catch (error) {
    return Promise.reject(error);
  }
};

const create = async columnData => {
  try {
    const url = createUrl();
    const column = await api.request(api.POST, url, columnData);
    return Promise.resolve(column);
  } catch (error) {
    return Promise.reject(error);
  }
};

const get = async columnId => {
  try {
    const url = createUrl(columnId);
    const column = await api.request(api.GET, url);

    return Promise.resolve(column);
  } catch (error) {
    return Promise.reject(error);
  }
};

const update = async (columnId, columnData) => {
  try {
    const url = createUrl(columnId);
    const column = await api.request(api.PUT, url, columnData);
    return Promise.resolve(column);
  } catch (error) {
    return Promise.reject(error);
  }
};

const remove = async columnId => {
  try {
    const url = createUrl(columnId);
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
