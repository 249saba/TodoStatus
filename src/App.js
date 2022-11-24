import { useState } from "react";
import "./App.css";
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  const createTicket = () => {
    let a = [...list];
    let obj = {
      value: name,
      stage: "backlog",
    };
    a.push(obj);
    setList(a);
    setName("");
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleNext = (item) => {
    const stages = ["backlog", "todo", "ongoing", "done"];
    let tasks = list.map((task) => {
      if (task.value === item.value) {
        let currStageIndex = stages.indexOf(item.stage);
        task.stage = stages[currStageIndex + 1];
      }
      return task;
    });
    setList(tasks);
  };
  const handleBack = (item) => {
    const stages = ["backlog", "todo", "ongoing", "done"];
    let tasks = list.map((task) => {
      if (task.value === item.value) {
        let currStageIndex = stages.indexOf(item.stage);
        task.stage = stages[currStageIndex - 1];
      }
      return task;
    });
    setList(tasks);
  };

  const TodoItem = ({ item, index }) => {
    return (
      <div key={item.value + index} className="container">
        <div class="item">
          <p>{item.value}</p>
        </div>
        <div>
          {item.stage == "backlog" ? (
            <button
              class="pointerClass"
              id="arrow"
              disabled={"true"}
              onClick={() => {}}
            >
              &#129044;
            </button>
          ) : (
            <button
              className="pointerClass"
              id="arrow"
              onClick={() => {
                handleBack(item);
              }}
            >
              &#129044;
            </button>
          )}
        </div>

        <div>
          {item.stage != "done" ? (
            <button
              id="arrow"
              className="pointerClass"
              onClick={() => {
                handleNext(item);
              }}
            >
              &#10141;
            </button>
          ) : (
            <button id="arrow" disabled={"true"} className="pointerClass">
              &#10141;
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="parent">
      <div className="App-header">
        <div>
          <input
            type="text"
            value={name}
            id="input"
            onChange={handleChange}
            placeholder=" Add your new todo"
          />
        </div>
        <div className="b1" onClick={createTicket}>
            &#10010;
        </div>
      </div>
      <div className="divs">
        <div className="App">
          <div className="heading">Backlog</div>
          <div className="list">
            {list
              .filter((item) => item.stage == "backlog")
              .map((item, index) => (
                <TodoItem item={item} index={index} />
              ))}
          </div>
        </div>
        <div className="App">
          <div className="heading">To Do</div>
          <div className="list">
            {list
              .filter((item) => item.stage == "todo")
              .map((item, index) => (
                <TodoItem item={item} index={index} />
              ))}
          </div>
        </div>

        <div className="App">
          <div className="heading">Ongoing</div>
          <div className="list">
            {list
              .filter((item) => item.stage == "ongoing")
              .map((item, index) => (
                <TodoItem item={item} index={index} />
              ))}
          </div>
        </div>
        <div className="App">
          <div className="heading">Done</div>
          <div className="list">
            {list
              .filter((item) => item.stage == "done")
              .map((item, index) => (
                <TodoItem item={item} index={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
