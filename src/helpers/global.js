import axios from "axios";
import { useDispatch } from "react-redux";

export const GetData = async (token) => {
  //   const dispatch = useDispatch();
  try {
    return await axios
      .get("https://test-binar.herokuapp.com/v1/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.result;
      });
  } catch (error) {}
};


// save product
export const saveProduct = async (token, name, price, imageurl) => {
  try {
    return await axios
      .post(
        "https://test-binar.herokuapp.com/v1/products/",
        { name, price, imageurl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {});
  } catch (error) {
    console.log(error);
  }
};

// update
export const updateProduct = async (token, id, name, price, imageurl) => {
  try {
    await axios
      .put(
        `https://test-binar.herokuapp.com/v1/products/${id}`,
        { name, price, imageurl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => console.log(data));
  } catch (error) {
    console.log(error);
  }
};
