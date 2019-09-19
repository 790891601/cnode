const HOST = "https://cnodejs.org/api/v1";

export const getTopics = (category= "", page=1) => {
  if(category === "index") {
    category = "";
  }
  return fetch(`${HOST}/topics?tab=${category}&page=${page}`)
    .then(data => data.json())
    .catch(err => console.error(err));
}

export const getDetails = (id) => {
  return fetch(`${HOST}/topic/${id}`)
    .then(data => data.json())
    .catch(err => console.log(err))
}

export const getUser = (username) => {
  return fetch(`${HOST}/user/${username}`)
    .then(data => data.json())
    .catch(err => console.log(err))
}
