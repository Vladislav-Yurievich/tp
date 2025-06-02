import React from 'react';

const ProfilePage = () => {
  // Данные студента
  const studentData = {
    fullName: 'Смирнова Анна Дмитриевна',
    city: 'Тюмень',
    group: 'ИИПБ-22-2',
    recordBook: '22-03-01472',
    phone: '+7(915) 342-67-89',
    email: 'smirnova.ad@edu.ru',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',   // аватарка через сайт рандомную ебанул https://randomuser.me/ - вот сайт лютый
    rating: 87,
    level: 'Отличник',
    attendance: '92%'
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Аватар и основная информация */}
          <div className="flex flex-col items-center md:w-1/3">
            <img 
              src={studentData.avatar} 
              alt="Фото студента" 
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-100"
            />
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-1">{studentData.fullName}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                studentData.rating >= 90 ? 'bg-purple-100 text-purple-800' : 
                studentData.rating >= 80 ? 'bg-blue-100 text-blue-800' : 
                'bg-yellow-100 text-yellow-800'
              }`}>
                Рейтинг: {studentData.rating} ({studentData.level})
              </span>
            </div>
          </div>

          {/* Детальная информация */}
          <div className="md:w-2/3">
            <h3 className="text-xl font-semibold mb-4">Личные данные</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Город</p>
                <p className="font-medium">{studentData.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Группа</p>
                <p className="font-medium">{studentData.group}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Зачётная книжка</p>
                <p className="font-medium">{studentData.recordBook}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Телефон</p>
                <p className="font-medium">{studentData.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{studentData.email}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Учебные показатели</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Посещаемость</p>
                  <p className="text-lg font-bold text-blue-600">{studentData.attendance}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Рейтинг</p>
                  <p className="text-lg font-bold text-purple-600">{studentData.rating}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Уровень</p>
                  <p className="text-lg font-bold text-green-600">{studentData.level}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Редактировать профиль
          </button>
        </div>
      </div>

      {/* Дополнительные карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Последние активности</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Посещение лекции "Базы данных" - 15.05.2023</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Сдача лабораторной работы №5 - 12.05.2023</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Получение оценки за курсовую - 10.05.2023</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Ближайшие события</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Экзамен по математике - 25.05.2023</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Консультация по диплому - 20.05.2023</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;