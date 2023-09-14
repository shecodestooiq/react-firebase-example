import { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import {
  collection,
  doc,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

function App() {
  const [todos, setTodos] = useState([]);
  const [nameField, setNameField] = useState('');
  const [timeField, setTimeField] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    onSnapshot(q, (data) => {
      const finalData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(finalData);
      setTodos(finalData);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'todos'), {
        name: nameField,
        time: timeField,
      });
    } catch (err) {
      alert(err);
    }
  }

  async function deleteTodo(id) {
    console.log(id);
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (err) {
      alert(err);
    }
  }

  async function updateTodo(id) {
    console.log(id);
    try {
      await updateDoc(doc(db, 'todos', id), {
        name: nameField,
        time: timeField,
      });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h1>Todos App</h1>
      <form onSubmit={handleSubmit}>
        <label>name</label>
        <input
          type='text'
          name='nameField'
          value={nameField}
          onChange={(e) => setNameField(e.target.value)}
        />
        <label>Time</label>
        <input
          type='text'
          name='nameField'
          value={timeField}
          onChange={(e) => setTimeField(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      {todos.map((todo) => (
        <div>
          {todo.name}{' '}
          <button onClick={() => updateTodo(todo.id)}>update</button>
          <button onClick={() => deleteTodo(todo.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
