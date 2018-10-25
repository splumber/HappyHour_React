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

class MyDialog extends React.Component {

  handleClickOpen = () => {
    //sends callback to home updating the state
    this.props.getModalState(true)
  };

  handleClose = (event) => {
    //sends callback to home updating the state. Also should send back the data from the forms, event target will always be the thing you clicked, so I don't know how to send like a whole card with it
    this.props.sendCancel()
    this.props.getModalState(false)
    console.log('EVENT TARGET STUFF BELOW!')
    console.log('all event.targets', event.target);

  };

  handleSubmit = (event) => {
    //sends callback to home updating the state. Also should send back the data from the forms, event target will always be the thing you clicked, so I don't know how to send like a whole card with it
    this.props.sendDeal()
    this.props.getModalState(false)
    console.log('EVENT TARGET STUFF BELOW!')
    console.log('all event.targets', event.target);

  };

  changeDay = event => {
    // this.setState({ selectedDay: event.target.value });
    this.props.setSelectedDay(event.target.value);

  };

  changeType = event => {
    // this.setState({ selectedDay: event.target.value });
    this.props.setSelectedType(event.target.value);

  };

  changeType = event => {
    // this.setState({ selectedDay: event.target.value });
    this.props.setSelectedType(event.target.value);

  };

  changeSummary = event => {
    // this.setState({ selectedDay: event.target.value });
    this.props.setSelectedSummary(event.target.value);

  };

  setStartTime = event => {
    // this.setState({ selectedDay: event.target.value });
    let time = event.target.value
    let newtime = time.replace(':','');
    let parsed = parseInt(newtime, 10);
    console.log('I changed set start time', parsed)
    this.props.setSelectedStart(parsed);

  };

  setEndTime = event => {
    // this.setState({ selectedDay: event.target.value });
    let time = event.target.value
    let newtime = time.replace(':','');
    let parsed = parseInt(newtime, 10);
    console.log('I changed end time', parsed)
    this.props.setSelectedEnd(parsed);

  };




  render() {
    const { classes, currentTab, toggleDrawerVisibility, drawerVisible } = this.props;

    // these lists are where we will derive our deals from
    
    // console.log(classes)
    return (
      <div>
        
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter Special</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your special's information below.
            </DialogContentText>
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label= "Ex. Two-for-One appetizers thursday until close."
              onChange = {this.changeSummary}
              fullWidth
            />
            <br />
            <br />
            <form className={classes.container}>
              <TextField
                onChange = {this.setStartTime}
                id="time"
                label="Start Time"
                type="time"
                defaultValue="09:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
              <TextField
                onChange = {this.setEndTime}
                id="time"
                label="End Time"
                type="time"
                defaultValue="12:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="age-required">Day</InputLabel>
                <Select
                  value={this.props.selectedDay}
                  onChange={this.changeDay}
                  name="DAY"
                  inputProps={{
                    id: 'age-required',
                  }}
                  className={classes.selectEmpty}
                >
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  <MenuItem value={'All'}>All</MenuItem>
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
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="age-required">Type</InputLabel>
                <Select
                  value={this.props.selectedType}
                  onChange={this.changeType}
                  name="DAY"
                  inputProps={{
                    id: 'age-required',
                  }}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={'Both'}>Both</MenuItem>
                  <MenuItem value={'Food'}>Food</MenuItem>
                  <MenuItem value={'Drink'}>Drink</MenuItem>
                  {/* ignore values atm */}

                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}



export default withStyles(styles)(MyDialog);


