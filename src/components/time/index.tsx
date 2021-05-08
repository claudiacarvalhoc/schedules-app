import { FC } from 'react';
import styles from './time.module.css';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

export interface TimeProps {
    label: string;
    time: string;
}

const Time: FC<TimeProps> = ({ label, time }) => (
    <div>
        <Typography
            className={styles.label}
            variant="overline"
            gutterBottom>
            {label}
        </Typography>
        <div>
            <Chip size="small" label={time} />
        </div>
    </div>
);

export default Time;