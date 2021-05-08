import { FC } from 'react';
import { LogTextState, ScheduleLogState } from '../../redux/appState';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import styles from './logitem.module.css';
import Time from '../time';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { getLogText } from '../../redux/app/selectors';

const DAY_FORMATE = 'MMMM D YYYY';
export interface LogItemOwnProps {
    item: ScheduleLogState;
}

export interface LogItemStateProps {
  texts: LogTextState;
}

export type LogItemProps = LogItemOwnProps & LogItemStateProps;

const LogItem: FC<LogItemProps> = ({ item, texts }) => {
    const startTimeFormatted  = dayjs(item.startTime.toString()).format(DAY_FORMATE);
    const endTimeFormatted  = dayjs(item.endTime.toString()).format(DAY_FORMATE);
    return (
    <Card className={styles.logs} variant="outlined">
      <CardContent className={styles.content}>
        <div className={styles.header}>
          <Typography className={styles.title} noWrap={true} color="primary" gutterBottom>
            {item.serverName}
          </Typography>
          <Chip size="small" label={item.status} />
        </div>
        <div className={styles.times}>
            <Time label={texts.labelStartTime} time={startTimeFormatted} />
            <Time label={texts.labelEndTime} time={endTimeFormatted} />
        </div>
      </CardContent>
    </Card>
    );
};

const mapStateToProps = (state: RootState): LogItemStateProps => (
  {
    texts: getLogText(state),
  }
);

export default connect<LogItemStateProps>(
  mapStateToProps,
)(LogItem);