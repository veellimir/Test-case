import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getProfile, postProfile, patchProfile } from '../../services/Main/user_profile';

import editIcon from '../../assets/edit.png';


const UserProfile = () => {
  const [profile, setProfile] = useState(null),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        [workingPosition, setWorkingPosition] = useState(''),
        [isCreating, setIsCreating] = useState(false),
        [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const fetchProfile = async (token) => {
    try {
      const response = await getProfile(token);
      if (response.data && response.data.length > 0) {
        setProfile(response.data[0]);
        setWorkingPosition(response.data[0].working_position || '');
      } else {
        setIsCreating(true);
      }
      setLoading(false);
    } catch (err) {
      setError('Ошибка при получении профиля');
      setLoading(false);
    }
  };

  const handleCreateProfile = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await postProfile(token, { working_position: workingPosition });
        setProfile(response.data);
        setIsCreating(false);
      } catch (err) {
        setError('Ошибка при создании профиля');
      }
    } else {
      navigate('/login');
    }
  };

  const handleEditProfile = async () => {
    const token = localStorage.getItem('authToken');
    if (token && profile) {
      try {
        const response = await patchProfile(token, profile.id, { 
            working_position: workingPosition, 
            user: profile.user,
        });
        setProfile(response.data);
        setIsEditing(false);
      } catch (err) {
        setError('Ошибка при редактировании профиля');
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchProfile(token);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      {profile ? (
        <div className='container__flex'>
          <p className="title">Ваша должность: {profile.working_position || 'Не указана'}</p>
          {isEditing ? (
            <div>
              <input
                className="field_input input-lower"
                type="text"
                value={workingPosition}
                onChange={(e) => setWorkingPosition(e.target.value)}
                placeholder="Должность"
              />
              <button className="success_button button-lower" onClick={handleEditProfile}>Сохранить</button>
              <button className="success_button button-lower" onClick={() => setIsEditing(false)}>Отмена</button>
            </div>
          ) : (
            <img className='icon'  src={editIcon} alt="Редактировать" onClick={() => setIsEditing(true)} />
        )}
        </div>
      ) : (
        isCreating ? (
          <div>
            <input
              className="field_input input-lower"
              type="text"
              value={workingPosition}
              onChange={(e) => setWorkingPosition(e.target.value)}
              placeholder="Должность"
            />
            <button className="success_button button-lower" onClick={handleCreateProfile}>Сохранить</button>
          </div>
        ) : (
          <div>Должность не указана</div>
        )
      )}
    </div>
  );
};

export default UserProfile;
