import React, { Component } from "react";
import { connect } from "react-redux";
import { employeeUpdate, logoutUser, formClear } from "../actions";
import { CardSection, Input } from "./common";
import Select from "react-select";
import Text from "react-text";
import _ from "lodash";

const options = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.phoneRef = React.createRef();
    this.shiftRef = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }
  componentDidMount() {
    if (this.props.clean) {
      this.props.formClear();
    }
    const employee = this.props.employee;
    /* _.each(employee, (value, prop) => {
      console.log("prop, value", prop, value);
      this.props.employeeUpdate({ prop, value });
    }); */

    for (var key in employee) {
      if (employee.hasOwnProperty(key)) {
        let prop = key;
        let value = employee[key];
        // console.log(key + " -> " + employee[key]);
        this.props.employeeUpdate({ prop, value });
      }
    }
    this.nameRef.current.focus();
  }

  focusTextInput() {
    this.nameRef.current.focus();
  }

  nameFieldKeyDown(e) {
    if (e.key === "Enter") {
      this.phoneRef.current.focus();
    }
  }
  phoneFieldKeyDown(e) {
    if (e.key === "Enter") {
      this.shiftRef.current.focus();
    }
  }

  shiftFieldKeyDown(e) {
    // if (e.key === "Enter") {
    //   this.saveRef.current.focus();
    // }
  }

  saveKeyDown(e) {
    this.onButtonClick();
  }

  handleChange = (selectedOption) => {
    let value = selectedOption.value.value;

    this.props.employeeUpdate({ prop: "shift", value });
  };

  signOutUser = () => {
    this.props.logoutUser();
  };

  render() {
    const styles = {
      fontSize: 15,
      topMargin: "2px",
      color: "red",
      alignSelf: "center",
    };
    // style = { pickerTextStyle };

    return (
      <div>
        <CardSection>
          <Input
            ref={this.nameRef}
            onKeyDown={(e) => this.nameFieldKeyDown(e)}
            label="Name"
            type="text"
            placeholder="Enter employee name"
            value={this.props.name}
            onChange={(value = value.target.value) =>
              this.props.employeeUpdate({
                prop: "name",
                value: value.target.value,
              })
            }
          />
          {this.props.flag && <label style={styles}>Name is required!</label>}
        </CardSection>

        <CardSection>
          <Input
            ref={this.phoneRef}
            onKeyDown={(e) => this.phoneFieldKeyDown(e)}
            label="Phone"
            type="text"
            placeholder="000-000-0000"
            value={this.props.phone}
            onChange={(value = value.target.value) =>
              this.props.employeeUpdate({
                prop: "phone",
                value: value.target.value,
              })
            }
          />
        </CardSection>
        <CardSection>
          <Text>Shift</Text>

          <Select
            //
            ref={this.shiftRef}
            onKeyDown={(e) => this.shiftFieldKeyDown(e)}
            placeholder={this.props.shift}
            options={options}
            value={this.props.shift}
            onChange={(value) => this.handleChange({ prop: "shift", value })}
          />
        </CardSection>
      </div>
    );
  }
}

const pickerTextStyle = {
  fontSize: 18,
  paddingLeft: 20,
  flex: 1,
  alignSelf: "center",
  flexDirection: "column",
};

const mapStateToProps = (state, ownProps) => {
  const { name, phone, shift, uid } = state.employeeForm;

  state.employeeForm.uid = uid;

  return { name, phone, shift, uid };
};

export default connect(mapStateToProps, {
  employeeUpdate,
  logoutUser,

  formClear,
})(EmployeeForm);
