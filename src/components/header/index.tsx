import { FC } from 'react';
import { getHeaderTexts } from '../../redux/app/selectors';
import { RootState } from '../../redux/reducers';
import { connect } from 'react-redux';
import DehazeIcon from '@material-ui/icons/Dehaze';
import styles from './header.module.css';
import Typography from '@material-ui/core/Typography';

export interface HeaderOwnProps { }

export interface HeaderStateProps {
  title: string,
}

export type HeaderProps = HeaderOwnProps & HeaderStateProps;

const Header: FC<HeaderProps> = ({
  title,
 }) => {
  return (
  <div className={styles.container}>
    <Typography className={styles.title} variant="h5" gutterBottom>
      {title}
    </Typography>
    <DehazeIcon/>
  </div>);
 };

const mapStateToProps = (state: RootState): HeaderStateProps => ({
    title: getHeaderTexts(state).titleText,
});

export default connect<HeaderStateProps>(
  mapStateToProps
)(Header);