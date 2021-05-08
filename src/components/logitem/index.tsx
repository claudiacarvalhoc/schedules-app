import { FC } from 'react';
import { ScheduleLogState } from '../../redux/appState';
// import cn from 'classnames';
// import styles from './logitem.module.css';

export interface ScheduleItemProps {
    item: ScheduleLogState;
}

const ScheduleItem: FC<ScheduleItemProps> = ({ item }) => (
    <div>
        {item.id}
    </div>
);

export default ScheduleItem;