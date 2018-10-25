import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  list: {
    width: 250,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class MyDayModal extends React.Component {

  handleClickOpen = () => {
    //sends callback to home updating the state
    this.props.getModalDayState(true)
  };

  handleClose = (event) => {
    //sends callback to home updating the state. Also should send back the data from the forms, event target will always be the thing you clicked, so I don't know how to send like a whole card with it
    this.props.getModalDayState(false)
    // console.log('EVENT TARGET STUFF BELOW!')
    // console.log('all event.targets', event.target);

  };

  // handleSubmit = (event) => {
  //   //sends callback to home updating the state. Also should send back the data from the forms, event target will always be the thing you clicked, so I don't know how to send like a whole card with it
  //   // this.props.sendDeal()
  //   this.props.getModalDayState(false)
  //   console.log('EVENT TARGET STUFF BELOW!')
  //   console.log('all event.targets', event.target);

  // };

  changeType = event => {
    // this.setState({ selectedDay: event.target.value });
    this.props.setSelectedTypeDay(event.target.value);

  };



  render() {
    const { classes, currentTab, toggleDrawerVisibility, drawerVisible } = this.props;

    // these lists are where we will derive our deals from

    // console.log(classes)
    return (
      <div>

        <Dialog
          open={this.props.dayModalOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Select a Day</DialogTitle>
          <DialogContent>
            <form>
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="age-required">Type</InputLabel>
                <Select
                  value={this.props.currentDay}
                  onChange={this.changeType}
                  name="DAY"
                  inputProps={{
                    id: 'age-required',
                  }}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={'All'}>All Week</MenuItem>
                  <MenuItem value={'Monday'}>Monday</MenuItem>
                  <MenuItem value={'Tuesday'}>Tuesday</MenuItem>
                  <MenuItem value={'Wednesday'}>Wednesday</MenuItem>
                  <MenuItem value={'Thursday'}>Thursday</MenuItem>
                  <MenuItem value={'Friday'}>Friday</MenuItem>
                  <MenuItem value={'Saturday'}>Saturday</MenuItem>
                  <MenuItem value={'Sunday'}>Sunday</MenuItem>
                  {/* ignore values atm */}

                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}



export default withStyles(styles)(MyDayModal);


