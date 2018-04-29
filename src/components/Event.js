import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react'
import { addEventToSharePoint, getEvents } from '../actions/event';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class Event extends React.Component {
    constructor() {
        super();
        this.handleAddEventButtonClick = this.handleAddEventButtonClick.bind(this)
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this)
        this.handleStartDateChange = this.handleStartDateChange.bind(this)

        this.state = {
            newEvent: {}
        }
    }
    componentDidMount() {
        var { dispatch } = this.props;
        dispatch(getEvents())
    }
    handleAddEventButtonClick(event) {
        var { dispatch, FormDigestValue } = this.props;
        // dispatch an action that will add event to sharePoint
        let newEvent = this.state.newEvent;
        dispatch(addEventToSharePoint(newEvent, FormDigestValue));
    }
    handleTitleInputChange(evt) {
        var eventTitle = evt.target.value
        const newState = {}
        var newEvent = this.state.newEvent;
        Object.assign(newEvent, newEvent, { Title: eventTitle })
        Object.assign(newState, this.state, { newEvent: newEvent });
        this.setState(newState);
    }
    handleStartDateChange(evt) {
        const newState = {}
        let startDate = moment(evt);
        var newEvent = this.state.newEvent;
        Object.assign(newEvent, newEvent, { StartDate: startDate })
        Object.assign(newState, this.state, { newEvent: newEvent });
        this.setState(newState);
    }
    render() {
        var { CalendarId, Events } = this.props;
        var { newEvent } = this.state;

        let selectedStartDate;
        if ((newEvent) && (newEvent.StartDate)) {
            selectedStartDate = newEvent.StartDate;
        }

        return (
            <div>
                <div>Add a new Event to SharePoint</div>
                <br />
                <br />
                <div>This is your calendarId!!{CalendarId}</div>
                <br />
                <br />
                Title:&nbsp;<Input onChange={this.handleTitleInputChange} />
                <br />
                Start Date: &nbsp;<DatePicker selected={selectedStartDate} onChange={this.handleStartDateChange} dateFormat='YYYY/MM/DD' />
                <Button content='Add Event' color='green' onClick={() => this.handleAddEventButtonClick()} />
                <br />
                <div>Items from SharePoint list "Events"</div>
                <br />
                <div>Hey These are the event rows!</div>
                {Events && Events.map((val, index) => (
                    <div key={index}>{val.Title} ---- {val.StartDate}</div>
                ))}
            </div>
        )
    }
}

Event.propTypes = {
    Events: PropTypes.array,
    FormDigestValue: PropTypes.string,
    CalendarId: PropTypes.string
}


const mapStateToProps = (state, ownProps) => {
    return {
        CalendarId: ownProps.calendarId,
        Calendars: state.calendarReducer.Calendars,
        Events: state.eventReducer.Events,
        FormDigestValue: state.sharepointReducer.FormDigestValue
    }
}

export default connect(mapStateToProps)(Event);