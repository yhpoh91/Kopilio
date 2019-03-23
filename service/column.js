const createColumnUrl = columnId => `http://localhost:3000/columns/${columnId || ""}`;

const listColumns = async () => {
  try {
    const url = createColumnUrl();
    const columns = await api.request(api.GET, url);
    return Promise.resolve(columns);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createColumn = async columnData => {
  try {
    const url = createColumnUrl();
    const column = await api.request(api.POST, url, columnData);
    return Promise.resolve(column);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getColumn = async columnId => {
  try {
    const url = createColumnUrl(columnId);
    const column = await api.request(api.GET, url);

    return Promise.resolve(column);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateColumn = async (columnId, columnData) => {
  try {
    const url = createColumnUrl(columnId);
    const column = await api.request(api.PUT, url, columnData);
    return Promise.resolve(column);
  } catch (error) {
    return Promise.reject(error);
  }
};

const removeColumn = async columnId => {
  try {
    const url = createColumnUrl(columnId);
    await api.request(api.DELETE, url);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

columnService = {
  listColumns,
  createColumn,
  getColumn,
  updateColumn,
  removeColumn
};
