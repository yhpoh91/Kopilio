const request = (method, url, data) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status < 400) {
        // Result is probably OK
        resolve(JSON.parse(xhr.response));
      } else if (xhr.status < 500) {
        // Result is probably Request Error (Client-sided)
        console.error(`An error has occurred on the server with status code ${xhr.status} (Client-sided)`);
        reject(xhr);
      } else {
        // Result is probably Server Error (Server-sided)
        console.error(`An error has occurred on the server with status code ${xhr.status} (Server-sided)`);
        reject(xhr);
      }
    }

    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    const body = data == null ? undefined : JSON.stringify(data);
    console.log(body);
    xhr.send(body);
  })
}

api = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",

  request,
};