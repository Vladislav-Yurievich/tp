import { useState } from 'react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: 'Бирюков Владислав Юрьевич',
    city: 'Тюмень',
    group: 'ИИПБ-22-1',
    studentId: '22-01-03189',
    phone: '+7(922) 40-50-994',
    email: 'accountformywork@gmail.ru'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="profile-card">
          <h1 className="text-xl font-semibold mb-6">Мой профиль</h1>
          <div className="profile-section">
            <div className="profile-field">
              <span className="profile-label">ФИО:</span>
              <span className="profile-value">{profile.fullName}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Город:</span>
              <span className="profile-value">{profile.city}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Группа:</span>
              <span className="profile-value">{profile.group}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Зачётная книжка:</span>
              <span className="profile-value">{profile.studentId}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Сотовый номер:</span>
              <span className="profile-value">{profile.phone}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{profile.email}</span>
            </div>
          </div>
        </div>

        <div className="profile-card">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold mb-6">Изменения</h2>
              <div className="space-y-4">
                <div>
                  <label className="profile-label block mb-1">Введите ФИО</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="profile-label block mb-1">Введите номер телефона</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="profile-label block mb-1">Введите адрес электронной почты</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary mt-6">
                Сохранить
              </button>
            </form>
          ) : (
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                Редактировать
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
