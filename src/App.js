import React, { useState, useEffect } from "react";
import "./App.css";
import { Table } from "react-bootstrap";
import { db } from "./firebase";
import { onValue, ref } from "firebase/database";
import { CrudPanel } from "./CrudPanel";

function App() {
  const [users, setUsers] = useState([]);
  let uniqueNumber = 0;

  useEffect(() => {
    const dbRef = ref(db, "users");

    return onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        let userInfo = data?.data;

        records.push({ key: keyName, data: userInfo });
      });
      setUsers(records);
    });
  }, []);

  // useEffect(() => {
  //   console.log("users", users);
  // }, [users]);

  return (
    <div className="App">
      <Table className="container w-75" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>Nome</th>
            <th>Aniversario</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Instagram</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={uniqueNumber++}>
                <td>{index + 1}</td>
                <td>{user.key}</td>
                <td>{user.data.name}</td>
                <td>{user.data.birth}</td>
                <td>{user.data.phoneNumber}</td>
                <td>{user.data.email}</td>
                <td>{user.data.social.instagram}</td>
                <td>
                  <CrudPanel user={{ id: user.key, data: user.data }} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
