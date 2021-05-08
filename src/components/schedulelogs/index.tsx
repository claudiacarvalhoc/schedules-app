import { FC } from 'react';
import { getScheduleLogsStatus, getSelectedScheduleId, getScheduleLogs, getScheduleLogsText } from '../../redux/app/selectors';
import { RootState } from '../../redux/reducers';
import { ScheduleLogState, ScheduleLogsTextState, StatusState } from '../../redux/appState';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import LogItem from '../logitem';
import styles from './schedulelogs.module.css';
import { AppDispatch } from '../../redux/store';
import Button from '@material-ui/core/Button';
import { getScheduleLogsAction } from '../../redux/app/actions';

export interface ScheduleLogsOwnProps { }

export interface ScheduleLogsStateProps {
  status: StatusState,
  logs: ScheduleLogState[],
  texts: ScheduleLogsTextState,
}

export interface ScheduleLogsDispatchProps {
  fetchScheduleLogs: () => void;
}

export type ScheduleLogsProps = ScheduleLogsOwnProps & ScheduleLogsStateProps & ScheduleLogsDispatchProps;

const ScheduleLogs: FC<ScheduleLogsProps> = ({
  status,
  logs,
  texts,
  fetchScheduleLogs,
 }) => {
  const isLoading = status === StatusState.Loading;
  const isSuccessfull = status === StatusState.Success;
  const isFailure = status === StatusState.Failure;

  const hasLogItems = Array.isArray(logs) && logs.length > 0;

  return (
  <>
  <div>
      {isLoading && (
      <div>
        <ReactLoading type='spin' color='#000000' height={50} width={50} />
      </div>)}

      {isFailure && (
        <div className={styles.info}>
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

      {isSuccessfull && hasLogItems && (
        <div className={styles.schedulelogs}>
          {logs.map(n => <LogItem key={n.id} item={n} />)}
        </div>)}

    </div>
  </>);
 };

const mapStateToProps = (state: RootState): ScheduleLogsStateProps => {
    const id = getSelectedScheduleId(state);
    const logs = getScheduleLogs(state);
    return {
        status: getScheduleLogsStatus(state),
        logs: logs.filter(n => n.scheduleId === id),
        texts: getScheduleLogsText(state),
    };
};

const mapDispatchToProps = (
  dispatch: AppDispatch
  ): ScheduleLogsDispatchProps => ({
    fetchScheduleLogs: () => dispatch(getScheduleLogsAction()),
});

export default connect<ScheduleLogsStateProps, ScheduleLogsDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleLogs);