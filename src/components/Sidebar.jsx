import { NavLink } from 'react-router-dom';
import { 
  FiUser, 
  FiCalendar, 
  FiBarChart2, 
  FiList,
  FiSettings,
  FiShield,
  FiMonitor
} from 'react-icons/fi';

const menuItems = [
  { icon: FiUser, text: 'Профиль', path: '/profile' },
  { icon: FiBarChart2, text: 'Посещаемость', path: '/attendance' },
  { icon: FiList, text: 'Рейтинговая система', path: '/rating' },
  { icon: FiCalendar, text: 'Журнал пропусков', path: '/journal' },
  { icon: FiCalendar, text: 'Календарь', path: '/calendar' },
  { icon: FiSettings, text: 'Настройки', path: '/settings' },
  { icon: FiShield, text: 'Безопасность', path: '/security' },
  { icon: FiMonitor, text: 'Внешний вид сайта', path: '/appearance' },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TP</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">Tracking Platform</span>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <item.icon className="w-5 h-5 mr-3 text-gray-500" />
              <span className="text-sm font-medium">{item.text}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
