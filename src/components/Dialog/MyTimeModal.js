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
import moment from 'moment';



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

class MyTimeModal extends React.Component {

  handleClickOpen = () => {
    //sends callback to home updating the state
    this.props.getModalTimeState(true)
  };

  handleClose = (event) => {
    //sends callback to home updating the state. Also should send back the data from the forms, event target will always be the thing you clicked, so I don't know how to send like a whole card with it
    this.props.getModalTimeState(false)
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
    this.props.setSelectedTypeTime(event.target.value);

  };

  getResetTime = () => {
    this.props.handleResetTime();
  }

  getChangedTime = event => {
    // this.setState({ selectedDay: event.target.value });
    let time = event.target.value
    let newtime = time.replace(':', '');
    let parsed = parseInt(newtime, 10);
    console.log('I changed set start time', parsed)
    this.props.setChangedTime(parsed);

  };


  render() {
    const { classes, currentTab, toggleDrawerVisibility, drawerVisible } = this.props;
    let timeModalChange = moment(this.props.currentTime,'Hmm' );
    let timeModalDefault = timeModalChange.format('HH:mm');
    
    
    // these lists are where we will derive our deals from

    console.log(classes)
    return (
      <div>
        <Dialog
          open={this.props.timeModalOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Select a Time</DialogTitle>
          <DialogContent>
            <form>
               {/* WE WILL CHANGE CURRENT DAY WHEN WE GET NICELY FORMATTED TIMES INTO DB */}
              <FormControl required className={classes.formControl}>
                {/* <InputLabel htmlFor="age-required">T</InputLabel> */}
                <TextField
                onChange = {this.getChangedTime}
                id="time"
                label="Ex. 12:00 PM"
                type="time"
                defaultValue={timeModalDefault}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
          <Button onClick={this.getResetTime} color="primary">
              RESET TO NOW
            </Button>
            <Button onClick={this.handleClose} color="primary">
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}



export default withStyles(styles)(MyTimeModal);


