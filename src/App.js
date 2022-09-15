import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list) { // if list exist return
    return JSON.parse(localStorage.getItem('list'))

  } else { // if list does not exist then return empty array
    return []
  }
}

function App() {

  // setting state values
  const [name,setName] = useState('');
  const [list,setList] = useState(getLocalStorage());

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditIt] = useState(null);

  const [alert, setAlert] = useState({
    show:false, 
    msg:'', 
    type: ''}) // type: success show the alert in gree. type: danger shows in red

const handleSubmit = (e) => {
  e.preventDefault();
  // console.log(`test`);

  if(!name) {
    // display alert
    showAlert(true, 'danger', 'please enter a value') // passing value to showAlert function in line 40

    // setAlert({show:true,msg:'please enter a value', type:'danger'})

  } else if (name && isEditing) {

    // deal with editing
    setList(list.map((item)=> { // accessing the item from list

      if(item.id === editId) {
        return {...item,title:name} // id will stay the same but now title will now be equal to name
      }
      return item; // by default
    }))

    setName('');
    setEditIt(null);
    setIsEditing(false);
    showAlert(true, 'success', 'value has been changed')
  } 
  else {
    // show alert
    showAlert(true,'success', 'item has been added to the list')

    const newItem = {id:new Date().getTime().toString(), title: name};
    setList([...list, newItem]); // this controls array
    setName('')
  }
}

const showAlert = (show=false, type='', msg='') => {
  setAlert({show,type,msg})
}

// for clearing the whole list
const clearList = () => {
  showAlert(true,'danger', 'empty List');
  setList([])
}

// for clearing the individual item
const removeItem = (id) => {
  showAlert(true, 'danger', 'item has been removed');
  setList(list.filter((item)=> item.id !==id))
     // if item id does not match then add it to new array. if it match does not return to the new array
  
}

// for editing item
const editItem = (id) => {
  const specificItem = list.find((item)=> item.id === id); // if the id of the item matches then return that item

  setIsEditing(true);
  setEditIt(id)
  setName(specificItem.title)
}

useEffect(()=> { // every time list chanes call local storage then set Item. key is list. we can store in string. so JSON.stringfiyu then pass list
localStorage.setItem('list', JSON.stringify(list))
},[list])

  return (
    <section className='section-center'>

      <form className='grocery-form' onSubmit={handleSubmit}>

    {/* alert */}
      {alert.show && <Alert {...alert} 
      removeAlert={showAlert}
      list={list}
      />}

      <h3>Grocery Bud</h3>
      <div className="form-control">

        <input type="text" 
          className='grocery'
          placeholder='meat'
          value={name} 
          onChange={(e)=> setName(e.target.value)}/>

        <button type='submit' className='submit-btn'>
          {isEditing ? 'edit' : 'submit'}   {/* if isEditing is true show edit . if it is false show submit*/}
        </button>
      </div>
      
      </form>

       {list.length > 0 && (   // {/* if the length is bigger than 0 then showcase that particular groecry container */}
      <div className="grocery-container">

         <List  items={list} removeItem={removeItem} 
         editItem = {editItem} />  

        <button className='clear-btn' onClick={clearList}>Clear The Items</button>
        </div>
       )}

    </section>
  )
}

export default App;

