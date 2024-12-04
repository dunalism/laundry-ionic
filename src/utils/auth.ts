import { User } from '../types';
import { getItem, setItem } from './localStorage';

export const registerUser = (userData: Omit<User, 'id'>): User => {
  const users = getItem('users') || [];
  const newUser: User = {
    ...userData,
    id: `user-${Date.now()}`,
  };
  
  users.push(newUser);
  setItem('users', users);
  return newUser;
};

export const loginUser = (email: string, password: string): User | null => {
  const users = getItem('users') || [];
  const user = users.find((u: User) => u.email === email && u.password === password);
  
  if (user) {
    setItem('currentUser', user);
    return user;
  }
  return null;
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = (): User | null => {
  return getItem('currentUser');
};