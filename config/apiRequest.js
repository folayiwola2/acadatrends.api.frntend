let isDev = /localhost/.test(window.location.origin);
console.log("isdev", isDev);
let base_url = isDev ? "http://localhost:4000/api" : "http://www.acadatrends.com/api";

const post = (action, request_data) => {
  return new Promise((resolve, reject) => {
    let route = action === null ? "/" : action;

    fetch(`${base_url}${route}`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": localStorage.getItem("admin") || ""
      },
      body: JSON.stringify(request_data)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const get = (action) => {
  let route = action === null ? "/" : action;
  return new Promise((resolve, reject) => {
    fetch(`${base_url}${route}`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": localStorage.getItem("admin") || ""
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};


const _delete = (action) => {
  return new Promise((resolve, reject) => {
    let route = action === null ? "/" : action;

    fetch(`${base_url}${route}`, {
      method: "DELETE",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": localStorage.getItem("admin") || ""
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};


export { post, get, _delete };
