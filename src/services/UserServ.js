export const verifyToken = async (token) => {
  const url = "https://dealsproject.herokuapp.com/user/authToken";
  let resp = await fetch(url, {
    headers: {
      "x-auth-token": token,
    },
  });
  let data = await resp.json();
  return data;
};

export const userLogin = async (user) => {
  const url = "https://dealsproject.herokuapp.com/user/login";
  let resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  let data = await resp.json();
  return data;
};

export const userSignup = async (user) => {
  const url = "https://dealsproject.herokuapp.com/user/signup";
  let resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  let data = await resp.json();
  return data;
};

export const userAddToCart = async (id, cart) => {
  const url = `https://dealsproject.herokuapp.com/user/cartUpdate/${id}`;
  let resp = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  });
  let data = await resp.json();
  return data;
};

export const userProfileUpdate = async (id, profile) => {
  const urlProf = `https://dealsproject.herokuapp.com/user/updateUserProfile/${id}`;
  let resp = await fetch(urlProf, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  let data = await resp.json();
  return data;
};

// ` https://dealsproject.herokuapp.com/user/addDish/${}`

// export const userDishesUpdate = async (user_id,dish_id, dish) => {
//   const urlProf = `https://dealsproject.herokuapp.com/user/updateDish/${user_id}/${dish_id}`;
//   let resp = await fetch(urlProf, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(dish),
//   });
//   let data = await resp.json();
//   return data;
// };

export const userAvatarUpdate = async (id, file) => {
  const urlFile = `https://dealsproject.herokuapp.com/user/userAvatar/${id}`;
  let resp = await fetch(urlFile, {
    method: "POST",
    body: file,
  });
  let data = await resp.json();
  return data;
};
export const userResturantDishAvatar = async (user_id, dish_id, file) => {
  const urlFile = ` http://localhost:3033/user/userResturantDishAvatar/${user_id}/${dish_id}`;
  let resp = await fetch(urlFile, {
    method: "POST",
    body: file,
  });
  let data = await resp.json();
  return data;
};

export const getUserById = async (id) => {
  const url = `https://dealsproject.herokuapp.com/user/single/${id}`;
  let resp = await fetch(url);
  let data = await resp.json();
  return data;
};
