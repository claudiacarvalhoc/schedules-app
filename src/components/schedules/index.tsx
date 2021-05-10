import { FC } from 'react';
import { getSchedulesStatus, getSchedules, getScheduleText, getSelectedScheduleId, isSearchApplied } from '../../redux/app/selectors';
import { RootState } from '../../redux/reducers';
import { ScheduleState, ScheduleTextState, StatusState } from '../../redux/appState';
import { AppDispatch } from '../../redux/store';
import { connect } from 'react-redux';
import ScheduleItem from '../scheduleitem';
import styles from './schedules.module.css';
import Button from '@material-ui/core/Button';
import { getSchedulesAction } from '../../redux/app/actions';

export interface SchedulesOwnProps { }

export interface SchedulesStateProps {
  status: StatusState,
  schedules: ScheduleState[],
  texts: ScheduleTextState;
  selectedScheduleId: number;
  isSearchApplied: boolean;
}

export interface SchedulesDispatchProps {
  fetchSchedules: () => void;
}

export type SchedulesProps = SchedulesOwnProps & SchedulesStateProps & SchedulesDispatchProps;

const Schedules: FC<SchedulesProps> = ({
  status,
  texts,
  schedules,
  selectedScheduleId,
  fetchSchedules,
  isSearchApplied,
 }) => {
  const isSuccessfull = status === StatusState.Success;
  const isFailure = status === StatusState.Failure;

  const hasItems = Array.isArray(schedules) && schedules.length > 0;

  return (
  <div className={styles.container}>

      {isFailure && (
        <div
          className={styles.info}
          data-test="schedules_failed"
          >
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

      {isSuccessfull && !hasItems && !isSearchApplied &&  (
        <div
          className={styles.info}
          data-test="schedules_loaded_without_data"
          >
          <p>{texts.emptyMessageText}</p>
        </div>
      )}

      {isSuccessfull && !hasItems && isSearchApplied &&  (
        <div
          className={styles.info}
          data-test="schedules_loaded_search_result"
          >
          <p>{texts.emptySearchResultText}</p>
        </div>
      )}

      <div
        className={styles.items}
        data-test="schedules_loaded_with_data"
        >
      {isSuccessfull && hasItems && (schedules.map(n => {
        const isSelected = n.id === selectedScheduleId;
        return <ScheduleItem key={n.id} schedule={n} isSelected={isSelected} />;
      }))}
      </div>
    </div>);
 };

const mapStateToProps = (state: RootState): SchedulesStateProps => ({
  status: getSchedulesStatus(state),
  schedules: getSchedules(state),
  texts: getScheduleText(state),
  selectedScheduleId: getSelectedScheduleId(state),
  isSearchApplied: isSearchApplied(state),
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