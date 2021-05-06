import { FC } from 'react';
import { getSchedulesStatus, getSchedules, getScheduleText } from '../../redux/app/selectors';
import { RootState } from '../../redux/reducers';
import { Schedule, ScheduleText, Status } from '../../redux/appState';
import { AppDispatch } from '../../redux/store';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import ScheduleItem from '../scheduleitem';
import styles from './schedules.module.css';
import Button from '@material-ui/core/Button';
import { getSchedulesAction } from '../../redux/app/actions';

export interface SchedulesOwnProps { }

export interface SchedulesStateProps {
  status: Status,
  schedules: Schedule[],
  texts: ScheduleText;
}

export interface SchedulesDispatchProps {
  fetchSchedules: () => void;
}

export type SchedulesProps = SchedulesOwnProps & SchedulesStateProps & SchedulesDispatchProps;

const Schedules: FC<SchedulesProps> = ({
  status,
  texts,
  schedules,
  fetchSchedules,
 }) => {
  const isLoading = status === Status.Loading;
  const isSuccessfull = status === Status.Success;
  const isFailure = status === Status.Failure;

  const isEmpty = Array.isArray(schedules) && schedules.length === 0;

  return (
  <div className={styles.container}>
      {isLoading && (
        <div className={styles.loading}>
          <ReactLoading type='spin' color='#000000' height={50} width={50} />
        </div>)
      }

      {isFailure && (
        <div className={styles.info}>
          <p>{texts.errorMessageText}</p>
          <Button
            onClick={() => fetchSchedules()}
            variant="contained"
            color="primary"
            disableElevation>
            {texts.buttonRetryText}
          </Button>
        </div>
      )}

      {isSuccessfull && isEmpty &&  (
        <div className={styles.info}>
          <p>{texts.emptyMessageText}</p>
        </div>
      )}

      {isSuccessfull && !isEmpty && (schedules.map(n => <ScheduleItem schedule={n} />))}
    </div>);
 };

const mapStateToProps = (state: RootState): SchedulesStateProps => ({
  status: getSchedulesStatus(state),
  schedules: getSchedules(state),
  texts: getScheduleText(state),
});

const mapDispatchToProps = (
    dispatch: AppDispatch
    ): SchedulesDispatchProps => ({
  fetchSchedules: () => dispatch(getSchedulesAction()),
});

export default connect<SchedulesStateProps, SchedulesDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Schedules);