import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FacebookLogin from 'react-facebook-login';



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

class LoginModal extends React.Component {

    handleClickOpen = () => {
        //sends callback to home updating the state
        this.props.getModalDayState(true)
    };

    handleClose = () => {
        //sends callback to home updating the state. Also should send back the data from the forms, event target will always be the thing you clicked, so I don't know how to send like a whole card with it
        this.props.getLoggingInState(false)
        // console.log('EVENT TARGET STUFF BELOW!')
        // console.log('all event.targets', event.target);

    };

    changeType = event => {
        // this.setState({ selectedDay: event.target.value });
        this.props.setSelectedTypeDay(event.target.value);

    };

    responseFacebook = (response) => {
        this.props.getLoggingInState(false)
        this.props.setLoggedInState(response);
        // console.log('FACEBOOK',response);
    }



    render() {
        const { classes, currentTab, toggleDrawerVisibility, drawerVisible } = this.props;

        // these lists are where we will derive our deals from

        // console.log(classes)
        return (
            <div>

                <Dialog
                    open={this.props.loggingIn}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Select a Day</DialogTitle>
                    <DialogContent>
                        <FacebookLogin
                            appId={686873101695118}
                            autoLoad={true}
                            fields='name,email'
                            onClick={this.componentClicked}
                            callback={this.responseFacebook}
                        />
                        {/* “FACEBOOK_APP_ID”: “686873101695118" */}
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



export default withStyles(styles)(LoginModal);