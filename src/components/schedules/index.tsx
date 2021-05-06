import React, { FC } from 'react';
import cn from 'classnames';
import { getSchedulesStatus, getSchedules, getSelectedScheduleId } from '../../redux/app/selectors';
import { RootState } from '../../redux/reducers';
import { Schedule, Status } from '../../redux/appState';
import { AppDispatch } from '../../redux/store';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import ScheduleItem from '../scheduleitem';
// import styles from './schedules.module.css';


export interface SchedulesOwnProps {
    className?: string;
}

export interface SchedulesStateProps {
  status: Status,
  schedules: Schedule[],
  selectedScheduleId: number,
}

export interface SchedulesDispatchProps {

}

export type SchedulesProps = SchedulesOwnProps & SchedulesStateProps & SchedulesDispatchProps;

const Schedules: FC<SchedulesProps> = ({
  className,
  status,
  schedules,
  selectedScheduleId,
 }) => {
  const isLoading = status === Status.Loading;
  const isSuccessfull = status === Status.Success;
  const isFailure = status === Status.Failure;

  return (
  <>
  <div>
      {isLoading && (
      <div>
        <ReactLoading type='spin' color='#000000' height={50} width={50} />
      </div>)}
      {isSuccessfull && (schedules.map(n => <ScheduleItem schedule={n} />))}
      {isFailure && (<p>Schedule cannot be fetched :(</p>)}
    </div>
  </>);
 };

const mapStateToProps = (state: RootState): SchedulesStateProps => ({
  status: getSchedulesStatus(state),
  schedules: getSchedules(state),
  selectedScheduleId: getSelectedScheduleId(state),
});

const mapDispatchToProps = (
    dispatch: AppDispatch
    ): SchedulesDispatchProps => ({
  // TODO : review
});

export default connect<SchedulesStateProps, SchedulesDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Schedules);