import { FC } from 'react';
import { getScheduleLogsStatus, getSelectedScheduleId, getScheduleLogs, getScheduleLogsText, getSchedules } from '../../redux/app/selectors';
import { RootState } from '../../redux/reducers';
import { ScheduleLogState, ScheduleLogsTextState, StatusState } from '../../redux/appState';
import { connect } from 'react-redux';
import LogItem from '../logitem';
import styles from './schedulelogs.module.css';
import { AppDispatch } from '../../redux/store';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getScheduleLogsAction, resetSelectedSchedule } from '../../redux/app/actions';

export interface ScheduleLogsOwnProps { }

export interface ScheduleLogsStateProps {
  isSelected: boolean;
  scheduleName: string;
  status: StatusState,
  logs: ScheduleLogState[],
  texts: ScheduleLogsTextState,
}

export interface ScheduleLogsDispatchProps {
  fetchScheduleLogs: () => void;
  resetSelectedSchedule: () => void;
}

export type ScheduleLogsProps = ScheduleLogsOwnProps & ScheduleLogsStateProps & ScheduleLogsDispatchProps;

const ScheduleLogs: FC<ScheduleLogsProps> = ({
  isSelected,
  scheduleName,
  status,
  logs,
  texts,
  fetchScheduleLogs,
  resetSelectedSchedule,
 }) => {

  const isSuccessfull = status === StatusState.Success;
  const isFailure = status === StatusState.Failure;

  if (!isSelected && isSuccessfull) {
    return (<div className={styles.info}>
      <p>{texts.noSelectedScheduleText}</p>
    </div>);
  }

  const hasLogItems = Array.isArray(logs) && logs.length > 0;
  return (
  <>
  <div>
      {isFailure && (
        <div className={styles.failure}>
          <p>{texts.errorMessageText}</p>
          <Button
            onClick={() => fetchScheduleLogs()}
            variant="contained"
            color="primary"
            disableElevation>
            {texts.buttonRetryText}
          </Button>
        </div>
      )}

      {isSuccessfull && !hasLogItems &&  (
        <div className={styles.info}>
          <p>{texts.emptyMessageText}</p>
        </div>
      )}

      <div className={styles.overlay} onClick={() => resetSelectedSchedule()} />
      {isSuccessfull && !hasLogItems &&  (
        <div className={styles.emptySuccess}>
          <p>{texts.emptyMessageText}</p>
        </div>
      )}
      {isSuccessfull && hasLogItems && (
        <div className={styles.schedulelogs}>
            <Typography className={styles.modalTitle} variant="h6">{scheduleName}</Typography>
            <div className={styles.items}>
              {logs.map(n => <LogItem key={n.id} item={n} />)}
            </div>
        </div>)}
    </div>
  </>);
 };

const mapStateToProps = (state: RootState): ScheduleLogsStateProps => {
    const id = getSelectedScheduleId(state);
    const schedules = getSchedules(state);
    const logs = getScheduleLogs(state);
    return {
        isSelected: !!id,
        scheduleName: !!id && schedules.find(n => n.id === id).name,
        status: getScheduleLogsStatus(state),
        logs: !!id && logs.filter(n => n.scheduleId === id),
        texts: getScheduleLogsText(state),
    };
};

const mapDispatchToProps = (
  dispatch: AppDispatch
  ): ScheduleLogsDispatchProps => ({
    fetchScheduleLogs: () => dispatch(getScheduleLogsAction()),
    resetSelectedSchedule: () => dispatch(resetSelectedSchedule()),
});

export default connect<ScheduleLogsStateProps, ScheduleLogsDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleLogs);