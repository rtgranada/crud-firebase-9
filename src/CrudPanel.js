import React, { useEffect, useState } from "react";
import { Button, Modal, InputGroup, Form } from "react-bootstrap";
import { ref, set, get, update, remove, child } from "firebase/database";
import { db } from "./firebase";
import { uid } from "uid";

export const CrudPanel = (props) => {
  const [crudUser, setCrudUser] = useState([]);
  const [tempUser, setTempUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [config, setConfig] = useState({ isOpen: false, mode: "" });

  async function getUser(id) {
    const snapshot = await get(ref(db, "/users/" + id));
    let user = snapshot.val();
    return user;
  }

  const openModal = (mode) => {
    setConfig({ ...config, isOpen: true, mode: mode });
    if (mode === "edit") {
      setTempUser({
        id: userId,
        data: {
          birth: crudUser?.data?.birth,
          city: crudUser?.data?.city,
          cover: crudUser?.data?.cover,
          created: crudUser?.data?.created,
          email: crudUser?.data?.email,
          msgids: crudUser?.data?.msgids,
          name: crudUser?.data?.name,
          online: crudUser?.data?.online,
          phoneNumber: crudUser?.data?.phoneNumber,
          isWhats: crudUser?.data?.isWhats,
          social: {
            tiktok: crudUser?.data?.social?.tiktok,
            twitter: crudUser?.data?.social?.twitter,
            facebook: crudUser?.data?.social?.facebook,
            instagram: crudUser?.data?.social?.instagram,
          },
        },
      });
    } else {
      let uuid = uid();
      setTempUser({
        id: uuid,
        data: {
          birth: crudUser?.data?.birth,
          city: crudUser?.data?.city,
          cover: crudUser?.data?.cover,
          created: crudUser?.data?.created,
          email: crudUser?.data?.email,
          msgids: crudUser?.data?.msgids,
          name: crudUser?.data?.name,
          online: crudUser?.data?.online,
          phoneNumber: crudUser?.data?.phoneNumber,
          isWhats: crudUser?.data?.isWhats,
          social: {
            tiktok: crudUser?.data?.social?.tiktok,
            twitter: crudUser?.data?.social?.twitter,
            facebook: crudUser?.data?.social?.facebook,
            instagram: crudUser?.data?.social?.instagram,
          },
        },
      });
    }
  };

  const closeModal = (mode) => {
    setConfig({ ...config, isOpen: false });
  };

  useEffect(() => {
    if (props) {
      console.log("props", props.user);
      const user = getUser(props.user.id);
      setUserId(props.user.id);
      return setCrudUser(props.user);
    }
  }, [crudUser, config]);

  useEffect(() => {
    // console.log("user", userId);
    // console.log("user", crudUser);
  }, [crudUser]);

  const interfaces = (option) => {
    if (option === "insert") insertData();
    else if (option === "update") updateData();
    else if (option === "delete") deleteData();

    closeModal();
  };

  const insertData = () => {
    const dbRef = ref(db);
    const record = tempUser;
    const uuid = record?.id;
    const address = `users/${uuid}`;

    get(child(dbRef, address)).then((snapshot) => {
      if (snapshot.exists()) {
        alert("cannot create, user already exists");
      } else {
        set(ref(db, address), record);
        console.log("usuario criado");
      }
    });
  };

  const updateData = () => {
    const dbRef = ref(db);
    const record = tempUser;
    const uuid = record?.id;
    const address = `users/${uuid}`;

    get(child(dbRef, address)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("usuario atualizado");
        update(ref(db, address), record);
      } else {
        alert("cannot update, user does not exists");
      }
    });
  };

  const deleteData = () => {
    const dbRef = ref(db);
    const record = tempUser;
    const uuid = record?.id;
    const address = `users/${uuid}`;

    get(child(dbRef, address)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("usuario excluido");
        remove(ref(db, address));
      } else {
        alert("cannot delete, user does not exists");
      }
    });
  };
  if (crudUser) {
    return (
      <>
        <Button
          variant="primary"
          className="ms-2"
          onClick={() => openModal("add")}
        >
          Add New Record
        </Button>
        <Button
          variant="primary"
          className="ms-2"
          onClick={() => openModal("edit")}
        >
          Edit Record
        </Button>
        <Modal show={config.isOpen}>
          <Modal.Header>
            <Modal.Title>
              {config.mode === "add" ? "Add new User" : "Edit User"}
            </Modal.Title>
            <Button
              size="sm"
              variant="dark"
              onClick={() => {
                closeModal();
              }}
            >
              X
            </Button>
          </Modal.Header>
          {console.log("usuarioCrud", crudUser?.data)}
          <Modal.Body>
            <InputGroup>
              <InputGroup.Text>Nome</InputGroup.Text>
              <Form.Control
                defaultValue={config.mode === "add" ? "" : crudUser?.data?.name}
                onChange={(e) => {
                  setTempUser((current) => {
                    const data = { ...current.data };
                    data.name = e.target.value;
                    return { ...current, data };
                  });
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Aniversario</InputGroup.Text>
              <Form.Control
                type="date"
                defaultValue={
                  config.mode === "add" ? "" : crudUser?.data?.birth
                }
                onChange={(e) => {
                  setTempUser((current) => {
                    const data = { ...current.data };
                    data.birth = e.target.value;
                    return { ...current, data };
                  });
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Telefone</InputGroup.Text>
              <Form.Control
                defaultValue={
                  config.mode === "add" ? "" : crudUser?.data?.phoneNumber
                }
                onChange={(e) => {
                  setTempUser((current) => {
                    const data = { ...current.data };
                    data.phoneNumber = e.target.value;
                    return { ...current, data };
                  });
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>E-mail</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={
                  config.mode === "add" ? "" : crudUser?.data?.email
                }
                onChange={(e) => {
                  setTempUser((current) => {
                    const data = { ...current.data };
                    data.email = e.target.value;
                    return { ...current, data };
                  });
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Instagram</InputGroup.Text>
              <Form.Control
                defaultValue={
                  config.mode === "add" ? "" : crudUser?.data?.social?.instagram
                }
                onChange={(e) => {
                  setTempUser((current) => {
                    const data = { ...current.data };
                    data.social.instagram = e.target.value;
                    return { ...current, data };
                  });
                }}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="ms-2"
              style={config.mode !== "add" ? { display: "none" } : {}}
              onClick={() => interfaces("insert")}
            >
              Add New Record
            </Button>
            <Button
              variant="success"
              className="ms-2"
              style={config.mode === "add" ? { display: "none" } : {}}
              onClick={() => interfaces("update")}
            >
              Update
            </Button>
            <Button
              variant="danger"
              className="ms-2"
              style={config.mode === "add" ? { display: "none" } : {}}
              onClick={() => interfaces("delete")}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
};
