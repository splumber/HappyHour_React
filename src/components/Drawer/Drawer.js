import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import MenuIcon from '@material-ui/icons/Menu';
import MediaCard from '../Card/MediaCard';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import InboxIcon from '@material-ui/icons/Inbox';
// import IntegrationReactSelect from '../ReactSelect/IntegrationReactSelect';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import moment from 'moment';





// const styles = {
//   list: {
//     width: 250,
//   }
// };

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
  root: {
    color: 'red'
  },
  label: {
    color: 'red'
  },
  text: {
    color: 'red'
  },

});


class TemporaryDrawer extends React.Component {

  handleClickOpen = () => {
    if (this.props.currentUserId == '') {
      this.props.handleOpen();
      console.log('YOU ARE NOT LOGGED IN YOU DO NOT HAVE PERMISSION');
    }
    else {
      console.log('YOU HAVE PERMISSION')
      this.props.getModalState(true)
    }
    //sends callback to home updating the state
  };

  handleClose = () => {
    //sends callback to home updating the state
    this.props.getModalState(false)
  };

  hasdeals = (deals) => {
    //sends callback to home updating the state. I dunno why this doesn't work.
    if (deals.hasFood == true && deals.hasDrink == true) {
      return 'BOTH'
    }
    if (deals.hasFood == true && deals.hasDrink == false) {
      return 'FOOD'
    }
    if (deals.hasFood == false && deals.hasDrink == true) {
      return 'DRINK'
    }
  };

  isId = (deal) => {
    if ((deal.businessId) == this.props.currentTab.id) {
      return true;
    }
  }

  sendUp = (event) => {
    let vote = event.target.attributes.getNamedItem('data-vote').value;
    let busId = event.target.attributes.getNamedItem('data-busId').value;
    let Id = event.target.attributes.getNamedItem('data-Id').value;
    let name = event.target.attributes.getNamedItem('data-name').value;

    let sendObj = {
      vote: vote,
      busId: busId,
      Id: Id,
      name: name
    }

    if (this.props.currentUserId == '') {
      console.log('YOU ARE NOT LOGGED IN YOU DO NOT HAVE PERMISSION');
      this.props.handleOpen();
    }
    else {
      this.props.getUp(sendObj);
    }

  }

  sendDown = (event) => {
    let vote = event.target.attributes.getNamedItem('data-vote').value;
    let busId = event.target.attributes.getNamedItem('data-busId').value;
    let Id = event.target.attributes.getNamedItem('data-Id').value;
    let name = event.target.attributes.getNamedItem('data-name').value;



    let sendObj = {
      vote: vote,
      busId: busId,
      Id: Id,
      name: name
    }

    if (this.props.currentUserId == '') {
      this.props.handleOpen();
      console.log('YOU ARE NOT LOGGED IN YOU DO NOT HAVE PERMISSION');
    }
    else {
      this.props.getDown(sendObj);

    }
  }



  render() {
    const { classes, currentTab, toggleDrawerVisibility, drawerVisible } = this.props;
    const filteredArray = this.props.deals.filter(this.isId);

    const isGood = {
      color: 'green'
    }

    const isBad = {
      color: 'red'
    }

    const buttonStyle = {
      backgroundColor: 'gray',
      color: 'white',
      // marginLeft: '50%',
      // marginRight: '50%',
      width: '100%'
    }




    // these lists are where we will derive our deals from
    const sideList = (
      <div className={classes.list}>
        {/* going to need a button that pulls up like a modal or something that has new deals or it's own List that submits a new deal. Probably a button that creates a list whatever that makes new deals and a map that populates those deals on load. And they should take the ID of what they're written on. */}
        {/* <IntegrationReactSelect /> */}
        {/* Summary, the times, the day, user is icebox */}
        <Button onClick={this.handleClickOpen}
        disableTypography

        style = {buttonStyle}
          // ContentProps={{
          //   classes: {
          //     root: classes.root,
          //     label: classes.label,
          //     text: classes.text
          //   }
          // }}
        >
          ADD NEW SPECIAL
        </Button>
        {filteredArray.map(deals => {
          // console.log('deals', deals)

          var startTimeChange = deals.timeStart;
          var startTimePassed = '';
          if (startTimeChange < 100) {
            startTimePassed = '12:' + deals.timeStart + 'am';
          }
          else {
            // var endChangeString = timeEndChange.toString()
            var startTimeChangeNew = moment(startTimeChange, 'Hmm');
            startTimePassed = startTimeChangeNew.format('h:mm A');
          }

          var endTimeChange = deals.timeEnd;
          var endTimePassed = '';
          if (endTimeChange < 100) {
            endTimePassed = '12:' + deals.timeEnd + ' am';
          }
          else {
            // var endChangeString = timeEndChange.toString()
            var endTimeChangeNew = moment(endTimeChange, 'Hmm');
            endTimePassed = endTimeChangeNew.format('h:mm A');
          }

          console.log('DEAL CHANGERS', deals, deals.timeStart, deals.timeEnd, startTimePassed, endTimePassed);



          if (deals.isGood > 1) {
            return (
              <div>
                <List>
                  <ListItem>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                    <ListItemText classes={isGood} primary={deals.timeDay} secondary={`${startTimePassed} - ${endTimePassed} `} />
                  </ListItem>
                </List>
                <List>
                  <ListItem button>
                    {/* <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon> */}
                    <ListItemText disableTypography style={isGood} primary={deals.summary} />
                  </ListItem>
                  <ListItem>
                    <div> Current Up: {deals.isGood}</div>
                    <div> Current Down: {deals.isBad}</div>
                    <input type="image" data-name = {deals.restaurantAlias} data-Id={deals._id} data-busId={deals.businessId} data-vote={deals.isGood} onClick={this.sendUp} src={require('../Images/2xbaseline_check_circle_outline_black_18dp.png')} />
                    <input type="image" data-name = {deals.restaurantAlias} data-Id={deals._id} data-busId={deals.businessId} data-vote={deals.isBad} onClick={this.sendDown} src={require('../Images/2xbaseline_highlight_off_black_18dp.png')} />
                  </ListItem>
                </List>
              </div>
            )


          }

          if (deals.isBad > 1) {
            return (
              <div>
                <List>
                  <ListItem>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                    <ListItemText primary={deals.timeDay} secondary={`${startTimePassed} - ${endTimePassed} `} />
                  </ListItem>
                </List>
                <List>
                  <ListItem button>
                    {/* <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon> */}
                    <ListItemText disableTypography style={isBad} primary={deals.summary} />
                  </ListItem>
                  <ListItem>
                    <div> Current Up: {deals.isGood}</div>
                    <div> Current Down: {deals.isBad}</div>
                    <input type="image" data-name = {deals.restaurantAlias} data-Id={deals._id} data-busId={deals.businessId} data-vote={deals.isGood} onClick={this.sendUp} src={require('../Images/2xbaseline_check_circle_outline_black_18dp.png')} />
                    <input type="image" data-name = {deals.restaurantAlias} data-Id={deals._id} data-busId={deals.businessId} data-vote={deals.isBad} onClick={this.sendDown} src={require('../Images/2xbaseline_highlight_off_black_18dp.png')} />
                  </ListItem>
                </List>
              </div>
            )


          }


          return (
            <div>
              <List>
                <ListItem>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText primary={deals.timeDay} secondary={`${startTimePassed} - ${endTimePassed} `} />
                </ListItem>
              </List>
              <List>
                <ListItem button>
                  {/* <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon> */}
                  {/* I'M GOING INSANE */}
                  <ListItemText disableTypography primary={deals.summary} />
                </ListItem>
                <ListItem>
                  <div> Current Up: {deals.isGood}</div>
                  <div> Current Down: {deals.isBad}</div>
                  <input type="image" data-name = {deals.restaurantAlias} data-userId={deals.userId} data-Id={deals._id} data-busId={deals.businessId} data-vote={deals.isGood} onClick={this.sendUp} src={require('../Images/2xbaseline_check_circle_outline_black_18dp.png')} />
                  <input type="image" data-name = {deals.restaurantAlias} data-userId={deals.userId} data-Id={deals._id} data-busId={deals.businessId} data-vote={deals.isBad} onClick={this.sendDown} src={require('../Images/2xbaseline_highlight_off_black_18dp.png')} />
                </ListItem>
              </List>
            </div>
          )


        })}
      </div>
    );

    console.log(classes)
    return (
      <div>
        {/* <MenuIcon onClick={toggleDrawerVisibility}>Open Left</MenuIcon> */}
        {/* <input type="text" value = {this.props.currentTab} onChange={this.toggleDrawerVisibility('left', true)}/> */}
        <Drawer open={drawerVisible} currentTab={currentTab} onClose={toggleDrawerVisibility}>
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDrawerVisibility}
            onKeyDown={toggleDrawerVisibility}
          >
            <MediaCard currentTab={currentTab} />
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);