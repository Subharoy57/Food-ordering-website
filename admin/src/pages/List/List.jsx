import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css';

const List = ({url}) => {
 
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      console.error('Error fetching list:', error);
      toast.error("Error fetching list");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error");
      }
    }




  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {/* Render list items */}
        {list.map((item, index) => (
          <div className="list-table-format" key={index}>
            <img src={`${url}/images/${item.image}`} alt="Food" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <button onClick={()=>removeFood(item._id)} className='cursor'>X </button>  
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;

