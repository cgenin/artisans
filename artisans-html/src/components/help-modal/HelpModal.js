import React, {Component, PropTypes} from 'react';
import IconButton from 'material-ui/IconButton/IconButton';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline';
import Dialog from 'material-ui/Dialog/Dialog';
import MarkdownElement from '../MarkdownElement';


class HelpModal extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
    };


    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <div>
                <IconButton tooltip="Aide" onTouchTap={this.handleOpen}>
                    <ActionHelpOutline />
                </IconButton>
                <Dialog title="De l'aide ?" autoScrollBodyContent={true}
                        actions={ <FlatButton label="Fermer" onTouchTap={this.handleClose}/>}
                        modal={false} open={this.state.open} onRequestClose={this.handleClose}>
                    <MarkdownElement text={this.props.text}/>
                </Dialog>
            </div>);
    }
}

export default HelpModal;