const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// GET /services
function getServicesPromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("../back-end/controller/services.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let services = JSON.parse(data);
        resolve(services);
      }
    });
  });
}
const getServices = (req, res) => {
  getServicesPromise()
    .then((services) => res.status(200).json(services))
    .catch((err) => res.status(500).send(err.message));
};

// GET DETAILS /services/:id
function getServicesDetailsPromise(id){
  return new Promise((resolve, reject) => {
    fs.readFile("../back-end/controller/services.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let services = JSON.parse(data);
        resolve(services);
      }
    });
  });
}
const getServicesDetails = (req, res) => {
  const id = req.params.id;
  getServicesDetailsPromise(id)
  .then((services) => {
    const service = services.find((c) => c.id === id)
    if(service){
      res.status(200).json(service)
    }else{
      res.status(404).send("Servico nao encontrado")
    }
  })
  .catch((err) => res.status(500).send(err.message))
}

// POST /services/new
function addServicesPromise(service) {
  return new Promise((resolve, reject) => {
    fs.readFile("../back-end/controller/services.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let services = JSON.parse(data);
        const id = uuidv4();
        const serviceNew = { id, ...service };
        services.push(serviceNew);

        fs.writeFile(
          "../back-end/controller/services.json",
          JSON.stringify(services),
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(serviceNew);
            }
          }
        );
      }
    });
  });
}
const addServices = (req, res) => {
  const service = req.body;
  addServicesPromise(service)
    .then((serviceNew) => res.status(200).json(serviceNew))
    .catch((err) => res.status(500).send(err.message));
};

//PUT /services/:id
function updateServicesPromise(id, service) {
  return new Promise((resolve, reject) => {
    fs.readFile("../back-end/controller/services.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let services = JSON.parse(data);
        const index = services.findIndex((e) => e.id === id);

        if (index === -1) {
          reject(new Error("Servico nao encontrado"));
        } else {
          const serviceUpdate = {
            ...services[index],
            ...service,
          };
          services[index] = serviceUpdate;

          fs.writeFile(
            "../back-end/controller/services.json",
            JSON.stringify(services),
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(serviceUpdate);
              }
            }
          );
        }
      }
    });
  });
}
const updateServices = (req, res) => {
  const id = req.params.id;
  const service = req.body;
  updateServicesPromise(id, service)
    .then((serviceUpdate) => res.status(200).json(serviceUpdate))
    .catch((err) => res.status(500).send(err.message));
};

// DELETE /services/:id
function deleteServicesPromise(id) {
  return new Promise((resolve, reject) => {
    fs.readFile("../back-end/controller/services.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const services = JSON.parse(data);
        const index = services.findIndex((e) => e.id === id);

        if (index === -1) {
          reject(new Error("Servico nao encontrado"));
        } else {
          services.splice(index, 1);

          fs.writeFile(
            "../back-end/controller/services.json",
            JSON.stringify(services),
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
const deleteServices = (req, res) => {
  const id = req.params.id;
  deleteServicesPromise(id)
    .then(() => res.status(200).json({ message: "Servico deletado" }))
    .catch((err) => res.status(500).send(err.message));
};

module.exports = { getServices, getServicesDetails, addServices, updateServices, deleteServices };
