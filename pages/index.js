import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import "../app/globals.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [timer, setTimer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTask, setCurrentTask] = useState("focus");
  const [paused, setPaused] = useState(true);
  const [minutes, setMinutes] = useState(24);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            handleTimerEnd();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);

      setTimer(interval);

      return () => clearInterval(interval);
    }
  }, [paused, seconds, minutes]);

  const handleStartPauseTimer = () => {
    setPaused(!paused);
  };

  const handleResetTimer = () => {
    clearInterval(timer);
    setPaused(true);
    if (currentTask === "shortbreak") {
      setMinutes(4);
    } else if (currentTask === "longbreak") {
      setMinutes(14);
    } else {
      setMinutes(24);
    }
    setSeconds(59);
  };

  const handleContinueTimer = () => {
    setPaused(false);
  };

  const handleTimerEnd = () => {
    alert("Timer ended!");
  };

  const handleTaskChange = (task) => {
    if (task === "shortbreak") {
      setMinutes(4);
    } else if (task === "longbreak") {
      setMinutes(14);
    } else {
      setMinutes(24);
    }

    setCurrentTask(task);
    setPaused(true);
    setSeconds(59);
  };

  return (
    <>
      <div className="container">
        <div className="section-container">
          <button onClick={() => handleTaskChange("focus")} className="btn btn-timer btn-focus">
            Focus
          </button>
          <button onClick={() => handleTaskChange("shortbreak")} className="btn btn-shortbreak">
            Short Break
          </button>
          <button onClick={() => handleTaskChange("longbreak")} className="btn btn-longbreak">
            Long Break
          </button>
        </div>
        <div className="time-btn-container">
          <span id="time">{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</span>
          <div className="btn-container">
            <button id="btn-start" onClick={handleStartPauseTimer} className={paused ? "show" : "hide"}>
              Iniciar
            </button>
            <button id="btn-pause" onClick={handleStartPauseTimer} className={paused ? "hide" : "show"}>
              Pausar
            </button>
            <button id="btn-continue" onClick={handleContinueTimer} className={paused ? "show" : "hide"}>
              Continuar
            </button>
            <button id="btn-reset" onClick={handleResetTimer} className="show">
              Resetar
            </button>
          </div>
        </div>
      </div>

      <div className="container-tasks">
        <div className="tituloc">
          <h1>Minhas Tarefas</h1>
          <Link className="create" href="/create">
            Adicionar Task
          </Link>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="taskd">
              <span>
                <strong>{task.title}</strong> - {task.description}
              </span>
              <span className="descript">
                <Link className="edit" href={`/${task.id}/edit`}>
                  Editar
                </Link>
                <Link className="delete" href={`/${task.id}/delete`}>
                  Excluir
                </Link>
              </span>
            </li>
          ))}
          {tasks?.length < 1 && (
            <div className="descrição">Sem tasks a serem concluídas.</div>
          )}
        </ul>
      </div>

      <Head>
        <title>Task</title>
      </Head>
    </>
  );
};

export default Home;
