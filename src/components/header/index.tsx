import { FC } from 'react';
import { getHeaderTexts } from '../../redux/app/selectors';
import { RootState } from '../../redux/reducers';
import { connect } from 'react-redux';
import styles from './header.module.css';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';

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
      <AppBar position="static">
        <Toolbar className={styles.bar}>
          <Typography variant="h6">{title}</Typography>
          <div className={styles.search}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: styles.inputRoot,
                  input: styles.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
          </div>
          <MenuIcon />
        </Toolbar>
      </AppBar>
    </div>
    );
 };

const mapStateToProps = (state: RootState): HeaderStateProps => ({
    title: getHeaderTexts(state).titleText,
});

export default connect<HeaderStateProps>(
  mapStateToProps
)(Header);