import React, { useState, useEffect } from 'react';

import { createTask, patchTasks } from '../../services/HomePage/api';

import styles from './TaskModal.module.css';


const TaskModal = ({ closeModal, authToken, onTaskCreated, task, onTaskUpdated }) => {
  const [title, setTitle] = useState(task?.title || ''),
        [description, setDescription] = useState(task?.description || ''),
        [completed, setCompleted] = useState(task?.completed || false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCompleted(task.completed);
    } else {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, completed };

    try {
      if (task) {
        await patchTasks(authToken, task.id, taskData);
        if (onTaskUpdated) onTaskUpdated({ ...task, ...taskData });
      } else {
        await createTask(authToken, taskData);
        if (onTaskCreated) onTaskCreated();
      }
      closeModal();
    } catch (err) {
      console.error(task ? 'Ошибка обновления задачи:' : 'Ошибка создания задачи:', err);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <h2>{task ? 'Редактировать задачу' : 'Создать новое задание'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название задачи"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание задачи"
          ></textarea>
          <label>
            <div className={styles.container_completed}>
              <span>Завершено:</span>
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
            </div>
          </label>
          <div>
            <button className="success_button" type="submit">
              {task ? 'Сохранить изменения' : 'Создать задачу'}
            </button>
            <button
              className="success_button btn-for-danger"
              style={{ marginLeft: 10 }}
              onClick={closeModal}
              type="button"
            >
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
