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
  const hasLogItems = Array.isArray(logs) && logs.length > 0;
  return (
  <>
    {/* No Schedule Selected */}
    {!isSelected && (
    <div
      className={styles.noinfo}
      data-test="schedulelogs_no_selected_schedule">
      <p>{texts.noSelectedScheduleText}</p>
    </div>)}
    {isSelected && (
      <>
        {/* Mobile overlay */}
        <div className={styles.overlay} onClick={() => resetSelectedSchedule()} />
        <div className={styles.schedulelogs}>
          <>
            {/* Mobile Title */}
            <Typography className={styles.modalTitle} variant="h6">{scheduleName}</Typography>
            {/* FAILURE */}
            {isFailure && (
              <div
                className={styles.failure}
                data-test="schedulelogs_load_failure_message"
                >
                <Typography className={styles.failureTitle} variant="body2" component="p">
                  {texts.errorMessageText}
                </Typography>
                <Button
                  className={styles.retryButton}
                  onClick={() => fetchScheduleLogs()}
                  variant="contained"
                  color="primary"
                  disableElevation>
                  {texts.buttonRetryText}
                </Button>
              </div>
            )}
            {/* SUCCESS WITHOUT DATA */}
            {isSuccessfull && !hasLogItems &&  (
              <div
                className={styles.emptySuccess}
                data-test="schedulelogs_load_empty_items"
                >
                <p>{texts.emptyMessageText}</p>
              </div>
            )}
            {/*  SUCCESS WITH DATA */}
            {isSuccessfull && hasLogItems && (
              <div
                className={styles.items}
                data-test="schedulelogs_load_items"
                >
                {logs.map(n => <LogItem key={n.id} item={n} />)}
              </div>
            )}
          </>
        </div>
      </>
  )}
  </>);
 };

const mapStateToProps = (state: RootState): ScheduleLogsStateProps => {
    const id = getSelectedScheduleId(state);
    const schedules = getSchedules(state);
    const logs = getScheduleLogs(state);
    return {
        isSelected: !!id,
        scheduleName: !!id && !!schedules && schedules.find(n => n.id === id).name,
        status: getScheduleLogsStatus(state),
        logs: !!id && !!logs && logs.filter(n => n.scheduleId === id),
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