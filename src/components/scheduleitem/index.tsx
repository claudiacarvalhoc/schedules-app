import React, { FC } from 'react';
import { Schedule } from '../../redux/appState';
import { AppDispatch } from '../../redux/store';
import { connect } from 'react-redux';
// import styles from './Schedule.module.css';
// import cn from 'classnames';

export interface ScheduleItemOwnProps {
    className?: string;
    schedule: Schedule;
}

export interface ScheduleItemDispatchProps {
  handleRetired: () => void;
  handleUnretired: () => void;
}

export type ScheduleProps = ScheduleItemOwnProps & ScheduleItemDispatchProps;

const ScheduleItem: FC<ScheduleProps> = ({
  className,
  schedule,
  handleRetired,
  handleUnretired,
 }) => {

  return (
  <>
    <p>{schedule.id}</p>
  </>);
};


const mapDispatchToProps = (
    dispatch: AppDispatch
    ): ScheduleItemDispatchProps => ({
    handleRetired: () => {
      console.log('retire');
    },
    handleUnretired: () => {
      console.log('unretire');
    },
    // on click will change the selected item
});

export default connect<ScheduleItemDispatchProps>(
  mapDispatchToProps
)(ScheduleItem);