import React from 'react';

import styles from './Tasks.module.css';


const Task = ({ task, onTaskDelete, onTaskEdit }) => {
  const handleDelete = () => {
    onTaskDelete(task.id);
  };

  const handleEdit = () => {
    onTaskEdit(task);
  };

  return (
    <div className={styles.task_card}>
      <h3 className={styles.task_title}>{task.title}</h3>
      <p className="task-description">{task.description || "Без описания"}</p>
      <p className="task-status">
        Статус: <span className={task.completed ? 'completed' : 'not-completed'}>
          {task.completed ? 'Завершена' : 'В процессе'}
        </span>
      </p>
        {!task.completed && (
      <div>
        <button 
          className="success_button btn_update_del" 
          onClick={handleEdit}
        >
          Редактировать
        </button>
        <button 
          className="success_button btn_update_del btn-for-danger" 
          style={{ marginLeft: 10 }} 
          onClick={handleDelete}
        >
          Удалить
        </button>
        </div>
      )}
      </div>
  );
};

export default Task;
