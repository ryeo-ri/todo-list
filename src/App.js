import React, { useEffect, useState } from 'react'
import {db} from './firebase/index'
import { collection, getDocs, addDoc, orderBy, query, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import './App.css'

function App() {

  const [todos, setTodos] = useState([]);
  const [newList, setNewList] = useState('');
  const [changed, setChanged] = useState(false);

  const date = new Date();
  const d_date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  const todosCollectionRef= collection(db,'todos'); //테이블 정보 가져오기 


  //create
  const creatList = async() => {
    await addDoc(todosCollectionRef, {
      content: newList,
      isDone: false,
      d_date: d_date,
      timeStape: Date.now()
    });
    setChanged(true)
  }

  //update
  const updateList = async(id, content) => {
    const msg = window.prompt('TODO',content);
    const listDoc = doc(todosCollectionRef,id)
    if(msg){
      await updateDoc(listDoc,{
          content: msg,
          d_date: d_date,
          timeStape: Date.now()
      })
    }
    setChanged(true)
  }

  //delete
  const deleteList = async(id) => {
      await deleteDoc(doc(todosCollectionRef,id))
      setChanged(true)
  }

  //Done
  const isDoneList = async(id,done) => {
    const listDoc = doc(todosCollectionRef,id)

    await updateDoc(listDoc, {
      isDone: !done
    });

    setChanged(true)
  }

  useEffect( () => {
    const getLists = async () => {
      const data = await getDocs(
        //todosCollectionRef
        //정렬하기 asc, desc 
        query(todosCollectionRef,orderBy('timeStape','desc'))
      ); //데이터 불러오기 
      setTodos(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    }
    getLists()
    setChanged(false)
  },[changed])
  console.log(todos)
  return (
    <div>
      <h2>오늘의 할일</h2>
      <p>
        <input 
          type='text' 
          placeholder='to do ...' 
          value={newList}
          onChange={e => setNewList(e.target.value)}      
        />
        <button
          onClick={ creatList }
        >ADD</button>
      </p>
      <hr/>
        {/*todos[0].content 단일로 사용*/}
        {/*map으로 사용*/}
        {todos.map( 
          value => (
            <h3 key={value.id}>
              <span className={value.isDone?'isDone':''}>{value.content}</span>
              <span className='date'>{value.d_date}</span>

              <button
                className={value.isDone?'isDone_btn':''}
                onClick={ ()=>{isDoneList(value.id, value.isDone)} }
              >Done</button>
              <button
                onClick={ ()=>{updateList(value.id, value.content)} }
              >Edit</button>
              <button
                onClick={ ()=>{deleteList(value.id)} }
              >Delete</button>              
            </h3>
          )
        )}

    </div>
  )
}

export default App