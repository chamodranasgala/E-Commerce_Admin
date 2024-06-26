import React, { Component } from 'react';
import axios from 'axios';

export default class add_subcategory extends Component {

  constructor(props) {
    super(props);

    this.state = {
      subcategory: ""
    }

    this.state = {
      subcat: []
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  // Validation
  validate = () => {

    let subcategoryError = "";


    if (!this.state.subcategory) {
      subcategoryError = 'This field is required!';
    }


    if (subcategoryError) {
      this.setState({ subcategoryError});
      return false;
    }

    return true;
  };

  //Add
  onSubmit = (e) => {
    e.preventDefault();

    const { memberName, address, email, phoneNumber, gender, weight, height, joiningDate, otherDetails } = this.state;

    const isValid = this.validate();
    if (isValid) {
      const data = {

        memberName: memberName,
        address: address,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        weight: weight,
        height: height,
        joiningDate: joiningDate,
        otherDetails: otherDetails
      }

      console.log(data)

      axios.post("/member/save", data).then((res) => {
        if (res.data.success) {
          alert("Member Detailes Saved Successfully");
          this.setState(
            {
              memberName: "",
              address: "",
              email: "",
              phoneNumber: "",
              gender: "",
              weight: "",
              height: "",
              joiningDate: "",
              otherDetails: ""
            }
          );

          window.location.href = '/memberlist';
        }
      });
    }
  }

  componentDidMount() {
    this.retrieveMembers();
  }

  retrieveMembers() {
    axios.get("/members").then(res => {
      if (res.data.success) {
        this.setState({
          members: res.data.existingMembers
        });

        console.log(this.state.members)
      }
    });
  }

  //Search
  filterData(members, searchKey) {
    const result = members.filter((member) =>
      member.memberName.toLowerCase().includes(searchKey)
    )

    this.setState({ members: result })
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/members").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingMembers, searchKey)
      }
    });
  }

  //Delete Button
  onDelete = (id) => {
    axios.delete(`/member/delete/${id}`).then((res) => {
      alert("Deleted Successfully.")
      this.retrieveMembers();
    });
  }

  



  render() {
    return (
      <div className='container' style={{ marginBottom: '50px' }}>

        <br></br>

        <div>
          <center><h4>Manage Categories - Add Subcategory</h4></center>
        </div>

        <br></br>


        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ marginLeft: '250px' }}>
          Add Subcategory
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Subcategory</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <form className='needs-validation' noValidate>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Main Category</label>
                    <input type='text' className='form-control' name='memberName' placeholder='' value={this.state.memberName} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.memberNameError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Subcategory</label>
                    <input type='text' className='form-control' name='address' placeholder='Enter Subcategory' value={this.state.address} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.addressError}
                    </div>
                  </div>

                </form>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-success" onClick={this.onSubmit}>Add</button>
              </div>

            </div>
          </div>
        </div>

        

        <table className='table table-hover' style={{ marginTop: '40px' }}>

          <thead>
            <tr>
              <th scope='col'>Main Category</th>
              <th scope='col'>Subcategory</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>

          <tbody>
          </tbody>
          
        </table>
      </div>
    )
  }
}