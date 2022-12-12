import React, { useState, useEffect } from "react";
import "./App.css";
import { Table } from "react-bootstrap";
import { db } from "./firebase";
import { onValue, ref } from "firebase/database";
import { CrudPanel } from "./CrudPanel";
import Moment from "moment";
import nonPicture from "./imgs/NoNPictureUser.png";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (users) {
      setLoading(false);
    }
  }, [users]);

  // useEffect(() => {
  //   setLoading(true)

  //   setTimeout(() => setLoading(false), 3000)
  // }, [])

  if (loading) {
    return (
      <div className="App">
        <p>Carregando....</p>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Table className="container w-75" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>id</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Nascimento</th>
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
                  <td>
                    {user?.data?.cover ? (
                      <img
                        src={user?.data?.cover}
                        alt=""
                        className="coverProfile"
                      />
                    ) : (
                      <img src={nonPicture} alt="" className="coverProfile" />
                    )}
                  </td>
                  <td>{user.data.name}</td>
                  <td>{Moment(user.data.birth).format("DD/MM/YYYY")}</td>
                  <td>{user.data.phoneNumber}</td>
                  <td>{user.data.email}</td>
                  <td>{user.data.social.instagram}</td>
                  <td>
                    <CrudPanel user={{ id: user?.key, data: user?.data }} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
