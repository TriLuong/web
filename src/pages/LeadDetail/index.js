import React, { Component } from 'react';
import Header from 'components/common/header';
import Footer from 'components/LeadDetail/footer';
import BreadCrumb from 'components/LeadDetail/breadcrumb';
import InputGroup from 'components/common/form/GroupInput';
import GroupSelectField from 'components/common/form/GroupSelect';
import IconHand from 'components/common/icon/IconHand';
import 'pages/ManageLead/styles.scss';

const optionsExperience = [
  { value: 'all', label: 'All Users' },
  { value: 'Name', label: 'Name' },
  { value: 'Branch', label: 'Branch' },
];

class SalesDetail extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
    };
  }

  onChange = date => this.setState({ date });

  render() {
    return (
      <div className="document">
        <Header />
        <BreadCrumb />
        <div className="container">
          <h2 className="page-title">Client Requirements</h2>
          <div className="form-title">Contact Info</div>
          <div className="form-row form-row-detail">
            <div className="form-group col-md-4">
              <InputGroup label="First Name" name="FirstName" />
            </div>
            <div className="form-group col-md-4">
              <InputGroup label="Last Name" name="LastName" />
            </div>
            <div className="form-group col-md-4">
              <InputGroup label="Email" name="Email" type="email" />
            </div>
          </div>
          <div className="form-row form-row-detail">
            <div className="form-group col-md-4">
              <InputGroup type="number" label="Mobile Number" name="MobileNumber" />
            </div>
            <div className="form-group col-md-4">
              <InputGroup label="Address" name="Address" />
            </div>
            <div className="form-group col-md-4">
              <GroupSelectField label="City" options={optionsExperience} />
            </div>
          </div>
          <div className="form-row form-row-detail">
            <div className="form-group col-md-4">
              <GroupSelectField label="State" options={optionsExperience} />
            </div>
            <div className="form-group col-md-4">
              <InputGroup type="number" label="Pin Code" name="PinCode" />
            </div>
            <div className="form-group col-md-4">
              <GroupSelectField label="Country" options={optionsExperience} />
            </div>
          </div>
          <div className="form-title">Budget</div>
          <div className="form-row form-row-detail">
            <div className="form-group col-md-3">
              <InputGroup label="Low" name="Budget" type="checkbox" id="Low" />
            </div>
            <div className="form-group col-md-3">
              <InputGroup label="Medium" name="Budget" type="checkbox" id="Medium" />
            </div>
            <div className="form-group col-md-3">
              <InputGroup label="High" name="Budget" type="checkbox" id="High" />
            </div>
          </div>
          <div className="form-row form-row-detail">
            <div className="form-group col-md-4">
              <InputGroup label="Enter budget amount (if available)" name="BudgetAmount" />
            </div>
          </div>
          <div className="form-title">Services Required</div>
          <div className="form-row form-row-detail">
            <div className="form-group col-md-3">
              <InputGroup label="Home" name="Home" type="checkbox" id="Home" />
            </div>
            <div className="form-group col-md-3">
              <InputGroup label="Kitchen" name="Kitchen" type="checkbox" id="Kitchen" />
            </div>
            <div className="form-group col-md-3">
              <InputGroup label="Dining room" name="DiningRoom" type="checkbox" id="DiningRoom" />
            </div>
            <div className="form-group col-md-3">
              <InputGroup label="Dining room" name="DiningRoom2" type="checkbox" id="DiningRoom2" />
            </div>
            <div className="form-group col-md-3">
              <InputGroup label="Living Room" name="LivingRoom" type="checkbox" id="LivingRoom" />
            </div>
            <div className="form-group col-md-3">
              <InputGroup label="Bedroom" name="Bedroom" type="checkbox" id="Bedroom" />
            </div>
          </div>
          <div className="form-row form-row-detail">
            <div className="form-group col-md-7">
              <InputGroup label="Special instructions (optional)" name="SpecialInstructions" />
            </div>
          </div>
          <div className="form-title">Experience Center</div>
          <div className="form-row form-row-detail">
            <div className="form-group col-md-4">
              <GroupSelectField label="Select Branch" options={optionsExperience} />
            </div>
            <div className="form-group col-md-5">
              <div className="box-alert">
                <div className="box-alert__inner">
                  <IconHand className="box-alert__icon" />
                  IMPORTANT: PLEASE DOUBLE CHECK BRANCH WITH THE CLIENT. CHANGING BRANCH WILL BROADCAST THE LEAD TO THAT
                  BRANCH.
                </div>
              </div>
            </div>
          </div>
          <div className="form-title">Meeting Availability</div>
          <h2 className="page-title">Broadcast Options</h2>
          <div className="form-title">Select Designer</div>
          <div className="form-row form-row-detail">
            <div className="form-group col-md-4">
              <InputGroup type="radio" label="All Designers in 1MG Experience Center" name="Designers" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default SalesDetail;
