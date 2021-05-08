import { FC } from 'react';
import { getScheduleLogsStatus, getSelectedScheduleId, getScheduleLogs } from '../../redux/app/selectors';
import { RootState } from '../../redux/reducers';
import { ScheduleLogState, StatusState } from '../../redux/appState';
// import { AppDispatch } from '../../redux/store';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import ScheduleItem from '../logitem';
// import styles from './ScheduleLogss.module.css';
// import cn from 'classnames';

export interface ScheduleLogsOwnProps {
    className?: string;
}

export interface ScheduleLogsStateProps {
  status: StatusState,
  logs: ScheduleLogState[],
}

export type ScheduleLogsProps = ScheduleLogsOwnProps & ScheduleLogsStateProps;

const ScheduleLogs: FC<ScheduleLogsProps> = ({
  className,
  status,
  logs,
 }) => {
  const isLoading = status === StatusState.Loading;
  const isSuccessfull = status === StatusState.Success;
  const isFailure = status === StatusState.Failure;

  return (
  <>
  <div>
      {isLoading && (
      <div>
        <ReactLoading type='spin' color='#000000' height={50} width={50} />
      </div>)}
      {isSuccessfull && (logs.map(n => <ScheduleItem key={n.id} item={n} />))}
      {isFailure && (<p>ScheduleLogs cannot be fetched :(</p>)}
    </div>
  </>);
 };

const mapStateToProps = (state: RootState): ScheduleLogsStateProps => {
    const id = getSelectedScheduleId(state);
    const logs = getScheduleLogs(state);
    return {
        status: getScheduleLogsStatus(state),
        logs: logs.filter(n => n.scheduleId === id),
    };
};

export default connect<ScheduleLogsStateProps>(
  mapStateToProps
)(ScheduleLogs);