import React, {useState, useEffect} from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("");
  const [userData, setUserData] = useState([]);


  useEffect(() => {    
    getValueFunction()
  }, [])
  
  const getValueFunction = () => {
    fetch("http://localhost:3000/posts")
    .then((getValue) => {
      return getValue.json();
    })
    .then((getData) => {
      setUserData(getData);
    })
  }
  const submitForm = (e) => {
    e.preventDefault()
    const obj = {name,title,city, country};

    fetch("http://localhost:3000/posts", {
      method : "POST",
      headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(obj)
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
  }

  const deleteFunction = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/posts/${id}`, {
      method : "DELETE"
    })
    .then((res) => {
      return res.json();
    })
    .then((deleteItem) => {
      console.log(deleteItem);
      getValueFunction();
    })
  }
  
  return (
    <>
    <table border="1">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Title</th>
          <th>City</th>
          <th>Country</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
      {
        userData.map((item, index) => 
          <tr key={item.id}>
            <td>{index}</td>
            <td>{item.name}</td>
            <td>{item.title}</td>
            <td>{item.city}</td>
            <td>{item.country}</td>
            <td><button onClick={() => deleteFunction(item.id)}>Delete</button></td>
          </tr>
        )
      }
      </tbody>
    </table> <br /><br />
    <form action="" onSubmit={submitForm}>
      <input type="text" value={name} onChange={(e)=> setName(e.target.value)} name="name" placeholder="Enter Your Name" />
      <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} name="title" placeholder="Enter Your Title" />
      <input type="text" value={city} onChange={(e)=> setCity(e.target.value)} name="city" placeholder="Enter Your City" />
      <input type="text" value={country} onChange={(e)=> setCountry(e.target.value)} name="country" placeholder="Enter Your Country" />
      <input type="submit" value="Submit" />
    </form>
    </>
  );
}

export default App;
