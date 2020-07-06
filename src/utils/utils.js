export const fetchUserProfile = (token, data, loadUser, onRouteChange) => {
  return fetch(
    `http://localhost:3000/profile/${data.id ? data.id : data.userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  )
    .then((resp) => resp.json())
    .then((user) => {
      console.log(user);
      if (user && user.email) {
        loadUser(user);
        onRouteChange("home");
      }
    })
    .catch((err) => console.log(err));
};
