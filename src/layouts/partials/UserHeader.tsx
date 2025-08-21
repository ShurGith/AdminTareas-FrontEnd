import { User } from '@/types';
import { FaUserCheck } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

type UserHeaderProps = {
  name: User['name']
  isError?: boolean;
}

function UserHeader({name, isError }: UserHeaderProps) {
  
  return isError ? <Navigate to="/auth/login" /> : 
  <div className="flex flex-wrap items-center justify-center gap-2 text-white">
      <span className="text-2xl "><FaUserCheck /></span>
      <h3 className="text-center">{name}</h3>
    </div>
 

}

export default UserHeader