import React, { useEffect, useState } from "react";
import "./Student.css";
import axios from "./../../config/axios";

import { 
  TrashIcon,
  PersonIcon,
  LockIcon,
  EditIcon,
  EyeIcon
} from "./Icons";

const Student = () => {
  // handle the state of the form
  const [student, setStudent] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const [role, setRole] = useState({
    name: "",
    displayName: "",
    description: "",
  });

  // handle the state of the list
  const [studentList, setStudentList] = useState([]);

  // handle modal state
  const [isModalOpen, setModalOpen] = useState(false);

  const [isRoles, setIsRoles] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const loadUser = () => {
    axios
      .get("users")
      .then((res) => {
        console.log("Fetched data successfully");
        setStudentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Handle submit button
  const handleSubmit = async (e) => {
    if (
      student.fullName !== "" &&
      student.phoneNumber !== "" &&
      student.email !== ""
    ) {
        alert("Student has been registered successfully");
        try {
          const res = await axios.post("users", student)
          .then((res) => {
            console.log(res)
            // alert("Data has been stored in the database")
          })
          .catch((err) => {
            console.log(err)
            alert("An error occured while trying to store data in the database")
          })
          .finally(() => {
            console.log("Request completed")
            loadUser();
          });
          console.log("Data has been stored in the database", res);
          
          

          setStudent({
            fullName: "",
            phoneNumber: "",
            email: "",
          });

        } catch (err) {
          console.log(err);
        }
      
    } else {
      alert("All fields are required");
    }
  };

  const handleRoleSubmit = async (e, userId) => {
    if (
      role.name !== "" &&
      role.displayName !== "" &&
      role.description !== ""
    ) {
        alert("Role has been registered successfully");
        try {
          const res = await axios.post("users/"+selectedStudent.id+"/roles", role)
          .then((res) => {
            console.log(res)
            // alert("Data has been stored in the database")
          })
          .catch((err) => {
            console.log(err)
            alert("An error occured while trying to store data in the database")
          })
          .finally(() => {
            console.log("Request completed")
            loadUser();
          });
          console.log("Data has been stored in the database", res);
          
          

          setRole({
            name: "",
            displayName: "",
            description: "",
          });

        } catch (err) {
          console.log(err);
        }
      
    } else {
      // alert("All fields are required");
    }
  };

  



  // Handle incoming data
  useEffect(() => {
    loadUser();
  }, []);

  // handle selected student data in the modal
  const [selectedStudent, setSelectedStudent] = useState({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  // Handle edit data
  const handleEdit = (id) => {
    axios
      .get("users/" + id)
      .then((res) => {
        console.log(res);
        setSelectedStudent({
          id: id,
          fullName: res.data.fullName,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
          roles: res.data.roles,
        });
        setModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 const handleEditRole = (userId) => {
    axios
      .get("users/" + userId)
      .then((res) => {
        console.log(res);
        setSelectedStudent({
          id: userId,
          fullName: res.data.fullName,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
          roles: res.data.roles,
        });
        setIsRoles(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //handle input changes in the modal

  const handleModalInput = (e) => {
    const { name, value } = e.target;
    setSelectedStudent({ ...selectedStudent, [name]: value });
  };

  const handleModalRoleInput = (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };

  
  // Handle delete data
  const handleDelete = (id) => {
    axios
      .delete("users/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loadUser();
      });
  };

  const handleDeleteRole = (id) => {
    axios
      .delete("users/" + selectedStudent.id + "/roles/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loadUser();
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card mt-5">
              <div
                className="card-header"
                style={{ fontSize: "2rem", fontWeight: "bold" }}
              >
                Student Management
              </div>
              <div className="card-body">
                <form className="form m-3" onSubmit={handleSubmit}>
                  <div className="form-group m-3">
                    <div className="row">
                      <div className="col-3 mt-2">
                        <div className="form-label">Name</div>
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Name"
                          value={student.fullName}
                          onChange={handleInputChange}
                          name="fullName"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group m-3">
                    <div className="row">
                      <div className="col-3 mt-2">
                        <div className="form-label">Email</div>
                      </div>
                      <div className="col-6">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Email"
                          name="email"
                          value={student.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group m-3">
                    <div className="row">
                      <div className="col-3 mt-2">
                        <div className="form-label">Phone Number</div>
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Phone Number"
                          name="phoneNumber"
                          value={student.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                 

                  <button
                    type="submit"
                    className="btn btn-primary w-50 float-right m-3"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="student-list mt-3">
              <h3 style={{ color: "white" }}>Student List</h3>
              <table className="table table-bordered mt-3 table-dark table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((entry, i) => (
                    <tr key={i}>
                      <td>CM-UDS-18SCI000{i}</td>
                      <td>{entry.fullName}</td>
                      <td>{entry.phoneNumber}</td>
                      <td>{entry.email}</td>
                      <td>
                        <button className="btn btn-primary m-1" onClick={() => handleEdit(entry.id)}>
                        <EyeIcon />
                        </button>
                        <button className="btn btn-info m-1" onClick={() => handleEditRole(entry.id)}>
                          <PersonIcon />
                        </button>
                        <button className="btn btn-secondary m-1" onClick={() => handlePermission(entry.id)}>
                          <LockIcon />
                        </button>
                        <button className="btn btn-danger m-1" onClick={() => handleDelete(entry.id)}>
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="modal"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            zIndex: "1",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fefefe",
              padding: " 20px",
              border: "1px solid #888",
              width: " 80%",
              maxWidth: " 500px",
              margin: "auto",
            }}
          >
            <button
              className="close"
              onClick={() => setModalOpen(false)}
              style={{
                width: "2.5rem",
                lineHeight: "2rem",
                padding: ".3rem",
                color: "red",
                marginBottom: "1rem",
              }}
            >
              x
            </button>
            <h2>Edit Student</h2>
            <form className="form m-3">
              <div className="form-group m-3">
                <div className="row">
                  <div className="col-3 mt-2">
                    <div className="form-label">Name</div>
                  </div>
                  
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={selectedStudent.fullName}
                      onChange={handleModalInput}
                      name="fullName"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group m-3">
                <div className="row">
                  <div className="col-3 mt-2">
                    <div className="form-label">Phone Number</div>
                  </div>
                  
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      value={selectedStudent.phoneNumber}
                      onChange={handleModalInput}
                      name="phoneNumber"
                    />
                  </div>
                </div>
              </div>
              

              <div className="form-group m-3">
                <div className="row">
                  <div className="col-3 mt-2">
                    <div className="form-label">Email</div>
                  </div>
                  <div className="col-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      name="email"
                      value={selectedStudent.email}
                      onChange={handleModalInput}
                    />
                  </div>
                </div>
              </div>

              <div className="student-list mt-3">
                <h3 style={{ color: "black" }}>Role list</h3>
                <table className="table table-bordered mt-3 table-dark table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Permissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudent.roles && selectedStudent.roles.map((entry, i) => (
                      <tr key={i}>
                        <td>{i}</td>
                        <td>{entry.name}</td>
                        <td>{entry.description}</td>
                        <td>
                          {entry.permissions && entry.permissions.map((permission, j) => (
                            <span key={j} className="badge badge-primary m-1">
                              {permission.name}
                            </span>
                          )).reduce((prev, curr) => [prev, ', ', curr])}
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>



              <button type="button" onClick={() => setModalOpen(false)} className="btn btn-primary w-100 m-3">
                Fermer
              </button>
            </form>
          </div>
        </div>
      )}

    {isRoles && (
            <div
              className="modal"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                zIndex: "1",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%",
                overflow: "auto",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
              }}
            >
              <div
                className="modal-content"
                style={{
                  backgroundColor: "#fefefe",
                  padding: " 20px",
                  border: "1px solid #888",
                  width: " 80%",
                  maxWidth: " 500px",
                  margin: "auto",
                }}
              >
                <button
                  className="close"
                  onClick={() => setIsRoles(false)}
                  style={{
                    width: "2.5rem",
                    lineHeight: "2rem",
                    padding: ".3rem",
                    color: "red",
                    marginBottom: "1rem",
                  }}
                >
                  x
                </button>
                <h2>Update Student Roles</h2>
                <form className="form m-3" onSubmit={handleRoleSubmit}>
                  <div className="form-group m-3">
                    <div className="row">
                      <div className="col-3 mt-2">
                        <div className="form-label">Role Name</div>
                      </div>
                      
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Role Name"
                          value={role.name}
                          onChange={handleModalRoleInput}
                          name="name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group m-3">
                    <div className="row">
                      <div className="col-3 mt-2">
                        <div className="form-label">Display Name</div>
                      </div>
                      
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          value={role.displayName}
                          onChange={handleModalRoleInput}
                          name="displayName"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group m-3">
                    <div className="row">
                      <div className="col-3 mt-2">
                        <div className="form-label">Description</div>
                      </div>
                      
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          value={role.description}
                          onChange={handleModalRoleInput}
                          name="description"
                        />
                      </div>
                    </div>
                  </div>
                  

                  <div className="student-list mt-3">
                    <h3 style={{ color: "black" }}>Role list</h3>
                    <table className="table table-bordered mt-3 table-dark table-striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          {/* <th>Display Name</th> */}
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedStudent.roles.map((entry, i) => (
                          <tr key={i}>
                            <td>{i}</td>
                            <td>{entry.name}</td>
                            {/* <td>{entry.displayName}</td> */}
                            <td>{entry.description}</td>
                            <td>
                             
                              <button className="btn btn-danger m-1" onClick={() => handleDeleteRole(entry.id)}>
                                <TrashIcon />
                              </button>
                            </td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>



                  <button type="submit" className="btn btn-primary w-100 m-3">
                    Ajouter
                  </button>
                </form>
              </div>
            </div>
          )}
    </div>
  );
};

export default Student;
