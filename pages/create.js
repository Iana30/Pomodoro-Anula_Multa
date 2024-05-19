// pages/create.js
import '../app/globals.css';
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Create = () => {
  const router = useRouter();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      // Task created successfully
      router.push("/");
    } else {
      // Handle error
      alert("Failed to create task");
    }
  };

  return (
    <>
      <div className="Criar tarefa">
        <div className="Tarefa">
          <h1 className="ctarefa">Criar Tarefa</h1>
        </div>
        <form>
          <div className="titulot">
            <label>Titulo</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="title"
              value={task?.title}
              onChange={onChange}
            />
          </div>
          <div className="descriçãot">
            <label>Descrição</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="description"
              value={task?.description}
              onChange={onChange}
            />
          </div>
          <button
            className="criart"
            type="button"
            onClick={handleCreate}
          >
            Criar Tarefa
          </button>
        </form>
      </div>
      <Head>
        <title>Criar Tarefa</title>
      </Head>
    </>
  );
};

export default Create;