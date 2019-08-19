import React, { Component } from 'react';
import { RADIO_SCHEDULED_MEETING } from 'pages/Designer/constants';
import RadioButton from 'components/common/form/RadioButton';
import IconSearch from 'components/common/icon/IconSearch';
import Switches from 'components/common/form/Switches';
import DatatablePage from './DatatablePage';

type Props = {
  handleOnChangeRadioButton: () => {},
  onSort: () => {},
  gotoPage: () => {},
  onSearch: () => {},
  onClick: () => {},
  onMeetingInfo: () => {},
  data: [],
  params: {
    keyword: String,
  },
};

class ScheduledMeeting extends Component<Props> {
  state = {
    filter: '',
  };

  handleOnChangeRadioButton = ({ value }) => {
    // console.log('handleOnChangeRadioButton', value);
    const { handleOnChangeRadioButton } = this.props;
    this.setState({ filter: value });
    handleOnChangeRadioButton({ filter: value });
  };

  render() {
    const { data, onSort, gotoPage, onSearch, onClick, onMeetingInfo, params } = this.props;
    const { filter } = this.state;
    return (
      <>
        <div className="top-control">
          <h1 className="top-control__header">Scheduled Meetings</h1>
          <Switches name="syscWithGoogle" label="Sync with Google Calendar" />
          <RadioButton
            className="ml-auto"
            classNameRadio="ml-5"
            options={RADIO_SCHEDULED_MEETING}
            onChange={this.handleOnChangeRadioButton}
            selectedOption={filter}
          />
          <div className="top-control__search ml-5">
            <input
              type="text"
              placeholder="Search"
              className="form-control"
              value={params.keyword || ''}
              onChange={onSearch}
            />
            <IconSearch className="top-control__search__icon" />
          </div>
        </div>
        <DatatablePage
          data={data}
          onSort={onSort}
          gotoPage={gotoPage}
          onClick={onClick}
          onMeetingInfo={onMeetingInfo}
        />
      </>
    );
  }
}

export default ScheduledMeeting;
