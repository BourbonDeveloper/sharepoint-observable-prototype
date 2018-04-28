import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react'
import { addEventToSharePoint, getEvents } from '../actions/actions';

class Event extends React.Component {
    constructor() {
        super();
        this.handleAddEventButtonClick = this.handleAddEventButtonClick.bind(this)
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this)

        this.state = {
            newEvent: {}
        }
    }
    componentDidMount() {       
        var { dispatch } = this.props;
        dispatch(getEvents())
    }
    handleAddEventButtonClick (event) {
        var { dispatch, FormDigestValue } = this.props;
        // dispatch an action that will add event to sharePoint
        let newEvent = this.state.newEvent;
        dispatch(addEventToSharePoint(newEvent, FormDigestValue));
    }
    handleTitleInputChange (evt) {
        var eventTitle = evt.target.value
        const newState = {}
        var newEvent = this.state.newEvent;
        Object.assign(newEvent, newEvent, {Title: eventTitle})
        Object.assign(newState, this.state, { newEvent: newEvent });
        this.setState(newState);
    }
    generateEventRows(events) {
        let eventArray = [];

        for(var i = 0; i < events.length; i++) {
            eventArray.push(<div key={i}> {events[i].Title} - {events[i].StartDate}</div>);
        }

        return eventArray;
    }
    render() {
        var {Events} = this.props;
        let eventRows;
        if(Events){
            eventRows = this.generateEventRows(Events);
        }
        return(
            <div>
                <div>Add a new Event to SharePoint</div>
                Title:&nbsp;<Input onChange={this.handleTitleInputChange} />
                <Button content='Add Event' color='green' onClick={() => this.handleAddEventButtonClick()} />
                <br/>
                <br/>
                <div>Items from SharePoint list "Events"</div>
                <br />
                {eventRows}
            </div>
        )
    }
}

Event.propTypes = {
    Events: PropTypes.array,
    FormDigestValue: PropTypes.string
}


const mapStateToProps = (state, ownProps) => {
    return {
      Events: state.eventReducer.Events,
      FormDigestValue: state.sharepointReducer.FormDigestValue
    }
}

export default connect(mapStateToProps)(Event);