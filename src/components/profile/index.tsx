import { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import styles from './profile.module.css';
import cn from 'classnames';

export interface ProfileProps {
  letter: string;
  color: string;
}

const Profile: FC<ProfileProps> = ({ letter, color }) => {
      return <Avatar className={cn({
        [styles.orange]: color === 'orange',
        [styles.purple]: color === 'purple',
      })}>
        {letter}
      </Avatar>;
};

export default Profile;