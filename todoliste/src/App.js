import { React, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Popup from "./components/Popup";
import Tasks from "./components/Tasks";
import Scroll from "./components/Scroll";
import { motion } from "framer-motion";
function App() {
  const [show, setShow] = useState(false);
  const [liste, setListe] = useState([]);

  const nbrs = liste.length;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let arr = localStorage.getItem("list of tasks");
    if (arr) {
      let obj = JSON.parse(arr);
      setListe(obj);
    }
  }, []);

  const handleSave = (obj) => {
    let templiste = liste;
    templiste.push(obj);
    localStorage.setItem("list of tasks", JSON.stringify(templiste));
    setListe(templiste);
    setShow(false);
  };

  const updatehandler = (obj, index) => {
    let tempList = liste;
    tempList[index] = obj;
    localStorage.setItem("list of tasks", JSON.stringify(tempList));
    setListe(tempList);
    window.location.reload();
  };

  const handledelete = (index) => {
    let templiste = liste;
    templiste.splice(index, 1);
    localStorage.setItem("list of tasks", JSON.stringify(templiste));
    setListe(templiste);
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="header text-center">
        <motion.h2
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          To Do List
        </motion.h2>

        <button
          className="add-btn"
          type="button"
          class="btn btn-outline-primary mt-2"
          onClick={handleShow}
        >
          Add task
        </button>
        <div style={{ color: "#e1ebfd" }}>Number of tasks is {nbrs}</div>
      </div>
      <Scroll>
        <motion.div
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 1 }}
        >
          <div className="liste-container">
            {liste &&
              liste.map((obj, index) => (
                <Tasks
                  key={index}
                  taskObj={obj}
                  index={index}
                  deleteTask={handledelete}
                  updateTask={updatehandler}
                />
              ))}
          </div>
          <Popup modal={show} toggle={handleClose} save={handleSave} />
        </motion.div>{" "}
      </Scroll>
    </div>
  );
}

export default App;
