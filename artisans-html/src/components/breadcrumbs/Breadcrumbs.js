import React, {Component, PropTypes} from 'react';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './Breadcrumbs.css';

class Breadcrumbs extends Component {

    static propTypes = {
        index: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <Stepper activeStep={this.props.index}>
                    <Step>
                        <StepLabel><span className="breadcrumb-label">Mon type d'artisans</span></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel><span className="breadcrumb-label">Choix</span></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel><span className="breadcrumb-label">Le lieux</span></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel><span className="breadcrumb-label">Confirmer</span></StepLabel>
                    </Step>
                </Stepper>
            </div>
        );
    }
}


export default Breadcrumbs;