import { FC } from 'react';
import { Schedule, ScheduleText } from '../../redux/appState';
import { AppDispatch } from '../../redux/store';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styles from './scheduleitem.module.css';
import { RootState } from '../../redux/reducers';
import { getScheduleText } from '../../redux/app/selectors';
import Profile from '../profile';
import ButtonAction from '../buttonaction';
import cn from 'classnames';
import { retireSchedule, unretireSchedule, updateSelectedSchedule } from '../../redux/app/actions';

export interface ScheduleItemOwnProps {
    schedule: Schedule;
    isSelected: boolean;
}

export interface ScheduleItemStateProps {
  texts: ScheduleText;
}

export interface ScheduleItemDispatchProps {
  updateSelectedId: (id: number) => void;
  retire: (id: number) => void;
  unretire: (id: number) => void;
}

export type ScheduleProps = ScheduleItemOwnProps & ScheduleItemStateProps & ScheduleItemDispatchProps;

const ScheduleItem: FC<ScheduleProps> = ({
  schedule,
  isSelected,
  texts,
  updateSelectedId,
  retire,
  unretire,
 }) => {
  const handleButtonClick = (event): void => {
    if (!schedule.isRetired) {
      retire(schedule.id);
    } else {
      unretire(schedule.id);
    }
    event.stopPropagation();
  };

  return (
  <div className={styles.container}>
    <Card
      data-test={`card_${schedule.id}`}
      onClick={() => updateSelectedId(schedule.id)}
      variant="outlined"
      className={cn({
        [styles.active]: isSelected,
      })}>
      <CardContent className={styles.content}>
        <div className={styles.header}>
          <Profile letter={schedule.avatar.letter} color={schedule.avatar.color}/>
          <Typography className={styles.title} color="textSecondary" gutterBottom>
            {schedule.name}
          </Typography>
        </div>
        <Typography variant="body2" component="p">
          {schedule.description}
        </Typography>
      </CardContent>
      <CardActions className={styles.action}>
        <ButtonAction
          data-test={`action_${schedule.id}_retire`}
          text={!schedule.isRetired ? texts.buttonRetireText : texts.buttonUnretireText}
          type={!schedule.isRetired ? 'secondary' : 'primary'}
          onClick={(event) => handleButtonClick(event)}
        />
      </CardActions>
    </Card>
  </div>);
};

const mapDispatchToProps = (
    dispatch: AppDispatch
    ): ScheduleItemDispatchProps => ({
      updateSelectedId: (id: number) => dispatch(updateSelectedSchedule(id)),
      retire: (id: number) => dispatch(retireSchedule(id)),
      unretire: (id: number) => dispatch(unretireSchedule(id)),
});

const mapStateToProps = (state: RootState): ScheduleItemStateProps => ({
  texts: getScheduleText(state),
});

export default connect<ScheduleItemStateProps,ScheduleItemDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleItem);
