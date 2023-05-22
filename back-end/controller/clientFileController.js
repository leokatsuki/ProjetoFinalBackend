const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// GET /clients
function getClientsPromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("../back-end/controller/clients.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let clients = JSON.parse(data);
        resolve(clients);
      }
    });
  });
}
const getClients = (req, res) => {
  getClientsPromise()
    .then((clients) => res.status(200).json(clients))
    .catch((err) => res.status(500).send(err.message));
};

//GET DETAILS /clients/:id
function getClientsDetailsPromise(id){
  return new Promise((resolve, reject) => {
    fs.readFile("../back-end/controller/clients.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let clients = JSON.parse(data);
        resolve(clients);
      }
    });
  });
}
const getClientsDetails = (req, res) => {
  const id = req.params.id;
  getClientsDetailsPromise(id)
  .then((clients) => {
    const client = clients.find((c) => c.id === id)
    if(client){
      res.status(200).json(client)
    }else{
      res.status(404).send("Cliente nao encontrado")
    }
  })
  .catch((err) => res.status(500).send(err.message))
}

// POST /clients/new
function addClientsPromise(client) {
  return new Promise((resolve, reject) => {
    fs.readFile("../back-end/controller/clients.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let clients = JSON.parse(data);
        const id = uuidv4();
        const clientNew = { id, ...client };
        clients.push(clientNew);

        fs.writeFile(
          "../back-end/controller/clients.json",
          JSON.stringify(clients),
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(clientNew);
            }
          }
        );
      }
    });
  });
}
const addClients = (req, res) => {
  const client = req.body;
  addClientsPromise(client)
    .then((clientNew) => res.status(200).json(clientNew))
    .catch((err) => res.status(500).send(err.message));
};

//PUT /clients/:id
function updateClientsPromise(id, client) {
  return new Promise((resolve, reject) => {
    fs.readFile("../back-end/controller/clients.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let clients = JSON.parse(data);
        const index = clients.findIndex((e) => e.id === id);

        if (index === -1) {
          reject(new Error("Cliente nao encontrado"));
        } else {
          const clientUpdate = {
            ...clients[index],
            ...client,
          };
          clients[index] = clientUpdate;

          fs.writeFile(
            "../back-end/controller/clients.json",
            JSON.stringify(clients),
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(clientUpdate);
              }
            }
          );
        }
      }
    });
  });
}
const updateClients = (req, res) => {
  const id = req.params.id;
  const client = req.body;
  updateClientsPromise(id, client)
    .then((clientUpdate) => res.status(200).json(clientUpdate))
    .catch((err) => res.status(500).send(err.message));
};

//DELETE /clients/:id
function deleteClientsPromise(id) {
  return new Promise((resolve, reject) => {
    fs.readFile("../back-end/controller/clients.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const clients = JSON.parse(data);
        const index = clients.findIndex((e) => e.id === id);

        if (index === -1) {
          reject(new Error("Cliente nao encontrado"));
        } else {
          clients.splice(index, 1);

          fs.writeFile(
            "../back-end/controller/clients.json",
            JSON.stringify(clients),
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            }
          );
        }
      }
    });
  });
}
const deleteClients = (req, res) => {
  const id = req.params.id;
  deleteClientsPromise(id)
    .then(() => res.status(200).json({ message: "Cliente deletado" }))
    .catch((err) => res.status(500).send(err.message));
};

module.exports = { getClients, getClientsDetails, addClients, updateClients, deleteClients };
