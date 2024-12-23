import React, { useState, useEffect } from 'react';

import { getTasks, getMyTasks, deleteTask } from "../../services/HomePage/api";

import Task from './TaskComp';
import TaskModal from './TaskModalComp';

import styles from './Tasks.module.css';


const Tasks = () => {
  const [tasks, setTasks] = useState([]),
        [isModalOpen, setIsModalOpen] = useState(false),
        [taskToEdit, setTaskToEdit] = useState(null),
        [filter, setFilter] = useState('all'),
        authToken = localStorage.getItem('authToken');

  const fetchTasks = async () => {
    try {
      const response = filter === 'my' 
        ? await getTasks(authToken)
        : await getMyTasks(authToken); 
      setTasks(response.data);
    } catch (err) {
      console.error('Ошибка загрузки задач:', err);
    }
  };

  const handleTaskDeleted = async (taskId) => {
    try {
      await deleteTask(authToken, taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error('Ошибка удаления задачи:', err);
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task))
    );
  };

  const openTaskModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const closeTaskModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(false);
  };

  const handleTaskCreated = () => {
    fetchTasks();
  };

  useEffect(() => {
    if (authToken) {
      fetchTasks();
    } else {
      console.error('Нет токена для авторизации');
    }
  }, [authToken, filter]);

  const completedTasks = tasks.filter((task) => task.completed),
        notCompletedTasks = tasks.filter((task) => !task.completed);

  return (
    <div className={styles.tasks_board}>
       <div className={styles.tasks_filters}>
          <button
            className={filter === 'my' ? styles.active_button : styles.default_button}
            onClick={() => setFilter('my')}
          >
            Все
          </button>
          <button
            className={filter === 'all' ? styles.active_button : styles.default_button}
            onClick={() => setFilter('all')}
          >
            Только мои
          </button>
        </div>

      <div className={styles.tasks_column}>
        <button 
          className="success_button" 
          style={{ marginBottom: 30 }} 
          onClick={openTaskModal}
        >
          Создать новое задание
        </button>
        <h2>Выполняются</h2>
        {notCompletedTasks.length > 0 ? (
          notCompletedTasks.map((task) => (
            <Task 
              key={task.id} 
              task={task} 
              onTaskDelete={handleTaskDeleted} 
              onTaskEdit={openEditTaskModal} 
            />
          ))
        ) : (
          <p>Нет незавершенных задач</p>
        )}
      </div>

      <div className={styles.tasks_column}>
        <h2>Завершенные</h2>
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <Task 
              key={task.id} 
              task={task} 
              onTaskDelete={handleTaskDeleted} 
              onTaskEdit={openEditTaskModal} 
            />
          ))
        ) : (
          <p>Нет завершенных задач</p>
        )}
      </div>

      {isModalOpen && (
        <TaskModal
          authToken={authToken}
          closeModal={closeTaskModal}
          onTaskCreated={handleTaskCreated}
          task={taskToEdit}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default Tasks;
