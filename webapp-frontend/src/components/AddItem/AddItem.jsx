import React,{useState,useEffect} from "react";
import "./AddItem.css";
import Axios from "axios";
import {useSelector,useDispatch} from 'react-redux'

  
const AddItem = () => {
  const token =  useSelector((state)=> state.auth.token);
  // const [name,setName] = useState('');
  // const [price,setPrice] = useState(0);
  // const [name,setName] = useState('');
  // const [name,setName] = useState('');
  const submitHandler = async (event) => {
    const obj={
      name:document.f1.name.value,
      price:document.f1.price.value,
      category:document.f1.category.value,
      imageUrl:document.f1.image.value
    }
    console.log('token_Add',token);
    const data = await Axios.post('http://127.0.0.1:4000/api/v1/canteen/dish/adddish',obj,{
      headers: {Authorization: `Bearer ${token}`}
    })
    console.log('add_data',data);
  }
 
  return (
    <div className="add-item-container">
      <h1>Add Items To Menu</h1>
      <div className="form-container">

        <form name="f1">
          <div className="form-item">
            <label>Item Name : </label>
            <input
              type="text"
              name="name"
              id="item-name"
              placeholder="Enter name of the item"
              required
            />
          </div>
          <div className="form-item">
            <label>Price : </label>
            <input
              type="number"
              min={1}
              name="price"
              id="price"
              placeholder="Enter the price"
              required
            />
          </div>
          <div className="form-item">
            <label className="cat">Category :&nbsp;&nbsp;&nbsp;</label>
            <select name="category" id="category" required>
              <option selected disabled>
                Select the Category
              </option>
              <option value="IceCream">IceCream</option>
              <option value="MainCourse">MainCourse</option>
              <option value="Starter">Starter</option>
            </select>
          </div>
          <div className="form-item">
            <label>Image : </label>
            <input
              type="text"
              min={1}
              name="image"
              id="image"
              placeholder="Enter the Url"
              required
            />
          </div>
          <input type="submit" value="ADD" className="add-btn" onClick={submitHandler}/>
        </form>

      </div>
    </div>
  );
};



export default AddItem;
