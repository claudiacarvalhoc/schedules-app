import { Component } from 'react';
import { getHeaderTexts } from '../../redux/app/selectors';
import { RootState } from '../../redux/reducers';
import { connect } from 'react-redux';
import styles from './header.module.css';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import { AppDispatch } from '../../redux/store';
import { searchSchedule } from '../../redux/app/actions';

export interface HeaderOwnProps { }

export interface HeaderStateProps {
  title: string,
}

export interface HeaderDispatchProps {
  search: (criteria: string) => void,
}

const ENTER_KEYCODE = 13;

interface HeaderState {
  search: string;
}

export type HeaderProps = HeaderOwnProps & HeaderStateProps & HeaderDispatchProps;

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.handleOnChange.bind(this);
    this.handleSearch.bind(this);
  }

  handleOnChange = (event) => {
    this.setState({
      ...this.state,
      search: event.target.value,
    });
  }

  handleSearch = (event) => {
    switch(event.keyCode) {
      case ENTER_KEYCODE:
      {
        const { search } = this.props;
        search(this.state.search);
        break;
      }
      default:
        break;
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleSearch);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleSearch);
  }

  render() {
    const { title } = this.props;
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
                  onChange={this.handleOnChange}
                />
            </div>
            <MenuIcon />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): HeaderStateProps => ({
    title: getHeaderTexts(state).titleText,
});

const mapDispatchToProps = (
  dispatch: AppDispatch
): HeaderDispatchProps => ({
  search: (criteria: string) => dispatch(searchSchedule(criteria)),
});

export default connect<HeaderStateProps, HeaderDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Header);