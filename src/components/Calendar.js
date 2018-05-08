import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dropdown } from 'semantic-ui-react'
import { getCalendars } from '../actions/calendar'
import { getExportData } from '../actions/export'
import Event from './Event';
import forEach from 'lodash-es/forEach'

class Calendar extends React.Component {
    constructor() {
        super();
        this.handleGetCalendarsButtonClick = this.handleGetCalendarsButtonClick.bind(this)
        this.handleCalendarChange = this.handleCalendarChange.bind(this)
        this.handleGetExportDataButtonClick = this.handleGetExportDataButtonClick.bind(this)

        this.state = {
            selectedCalendarId: ''
        }
    }
    componentDidMount() {       
        var { dispatch } = this.props;
        dispatch(getCalendars())
    }
    handleGetCalendarsButtonClick () {
        var { dispatch } = this.props;
        dispatch(getCalendars());
    }
    handleCalendarChange (evt, data) {
        this.setState({
            selectedCalendarId: data.value
        })
    }
    handleGetExportDataButtonClick() {
        const { dispatch } = this.props;
        dispatch(getExportData())
    }
    generateCalendarDropdownOptions(Calendars) {
         let keyIndex = 1;
         let options = [];

         forEach(Calendars, function(calendar) {
            var option = {
                key: keyIndex,
                text: (calendar.Title),
                value: (calendar.Id)
            }
            options.push(option);
            keyIndex++;
         })

         return options
    }
    render() {
        var {Calendars} = this.props;

        let calendarOptions = this.generateCalendarDropdownOptions(Calendars);
  
        return(
            <div>
                <Button content='Get Export Data' color='red' onClick={() => this.handleGetExportDataButtonClick()} />
                <div>Hey These are the calendar rows!</div>
                <Dropdown
                   text='Calendars'
                   onChange={this.handleCalendarChange}
                   labeled
                   selection
                   options={calendarOptions}
                   placeholder='Choose a calendar'                  
                />
                <Button content='Refresh Calendars' color='blue' onClick={() => this.handleGetCalendarsButtonClick()} />
                <br />
                <br />
                <br />
                <br />
                <div>-------------------------------------</div>
                <Event calendarId={this.state.selectedCalendarId.toString()} />            
            </div>
        )
    }
}

Calendar.propTypes = {
    Calendars: PropTypes.array
}


const mapStateToProps = (state, ownProps) => {
    return {
      Calendars: state.calendarReducer.Calendars
    }
}

export default connect(mapStateToProps)(Calendar);