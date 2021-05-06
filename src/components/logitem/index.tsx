import { FC } from 'react';
import { ScheduleLog } from '../../redux/appState';
// import cn from 'classnames';
// import styles from './logitem.module.css';

export interface ScheduleItemProps {
    item: ScheduleLog;
}

const ScheduleItem: FC<ScheduleItemProps> = ({ item }) => (
    <div>
        {item.id}
    </div>
);

export default ScheduleItem;