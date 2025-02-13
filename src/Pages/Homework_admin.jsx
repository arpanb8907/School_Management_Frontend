import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  FaSearch,
  FaClock,
  FaCheckCircle,
  FaClipboardCheck,
  FaHourglassStart,
  FaExclamationCircle,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Homework_admin() {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  
  const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_API_URL
    : process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetch_studentdetails = async () => {
      //console.log("Hii")
      try {
        const response = await axios.get(`${API_BASE_URL}/api/student/homework`);

        

        if (response.status !== 200) {
          alert("Server error");
          return;
        }

        setStudents(response.data);
        console.log(students);
      } catch (error) {
        console.error("Error fetching details", error);
      }
    };

    fetch_studentdetails();
  },[]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssignHomework = async () => {
    // Logic to assign homework
   
    
    setIsOpen(false);
    
    
    //alert('Homework Assigned');
    //console.log(selectedStudent)
    //const student_name = students.find((stu)=> stu.id===selectedStudent).name
    // console.log(selectedStudent)
    // console.log(subject)
    // console.log(submissionDate)
    // console.log(status)
    //console.log(student_name)

    // send req to backend to store these data

    const home_work_data = { selectedStudent, subject, submissionDate, status };

    try {

      const response = await axios.post(`${API_BASE_URL}/api/student/homework/assign",
        home_work_data`
      );

     
      console.log(response.status);
      if (response.status === 201) {
        alert("Homework is added");
      } else {

        alert(response.data);
      }
    } catch (error) {
      console.log("Error while assigning homework", error);
    }
  };

  const handleMarkComplete = (student_id) => {
    alert(`Homework for ${student_id} is completed`);
  };

  const handleEditHomework = (student_id) => {
    alert(`Homework for ${student_id} is edited`);
  };
  const handleDeleteHomework = (student_id) => {
    alert(`Homework for ${student_id} is deleted`);
  };

  const handleSendReminder = (student_id) => {
    alert(`Homework reminder is sent for ${student_id}`);
  };

  const handleAssignHomework_Directly = (student_id,student_name)=>{
    alert(`Home is added for ${student_name}`)
  }

  const handleStudentClick = (studentId) => {
    navigate(`/dashboard/admin/fee-management?studentId=${studentId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Assign Homework
        </h2>

        {/* Search and Assign Homework Button */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search student"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FaSearch className="absolute top-3 left-3 text-gray-500" />
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            aria-label="Assign Homework"
          >
            Assign Homework
          </button>
        </div>

        {/* No Students Found or Students Table */}
        {filteredStudents.length === 0 ? (
          <p className="text-gray-600">No students found</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full border-collapse">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th
                    className="px-6 py-3 text-left font-medium"
                    style={{ width: "25%" }}
                  >
                    Student
                  </th>
                  <th
                    className="px-6 py-3 text-left font-medium"
                    style={{ width: "25%" }}
                  >
                    Homework Status
                  </th>
                  <th
                    className="px-6 py-3 text-left font-medium"
                    style={{ width: "50%" }}
                  >
                    Action
                  </th>
                  <th
                    className="px-6 py-3 text-left font-medium"
                    style={{ width: "50%" }}
                  >
                    Fee Management
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="odd:bg-white even:bg-gray-50 hover:bg-blue-100 transition-all"
                  >
                    <td className="border px-6 py-4 text-gray-800 font-medium">
                      {student.name}
                    </td>

                    {/* Homework Status */}
                    <td className="border px-6 py-4">
                      <div
                        className={`px-4 py-2 rounded-full text-center inline-block
                          ${
                            student.status === "Pending"
                              ? "bg-gray-500 text-white"
                              : ""
                          }
                          ${
                            student.status === "Assigned"
                              ? "bg-blue-500 text-white"
                              : ""
                          }
                          ${
                            student.status === "Submitted"
                              ? "bg-green-500 text-white"
                              : ""
                          } 
                          hover:bg-opacity-80 transition-all duration-200 ease-in-out`}
                      >
                        {student.status === "Pending" && (
                          <span className="flex items-center justify-center">
                            <FaClock className="mr-2" /> Pending
                          </span>
                        )}
                        {student.status === "Assigned" && (
                          <span className="flex items-center justify-center">
                            <FaCheckCircle className="mr-2" /> Assigned
                          </span>
                        )}
                        {student.status === "Submitted" && (
                          <span className="flex items-center justify-center">
                            <FaClipboardCheck className="mr-2" /> Submitted
                          </span>
                        )}
                        {
                          <span className="flex items-center justify-center">
                            <FaExclamationCircle className="mr-2" /> Yet to be
                            assigned
                          </span>
                        }
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="border px-6 py-4">
                      <div className="flex flex-wrap gap-3 justify-center">
                        <button
                          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                          onClick={()=>handleAssignHomework_Directly(student.id,student.name)}
                          aria-label="Assign Homework"
                        >
                          Assign
                        </button>

                        <button
                          className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                          onClick={() => handleMarkComplete(student.id)}
                          aria-label="Mark Complete"
                        >
                          Mark Complete
                        </button>

                        <button
                          className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
                          onClick={() => handleEditHomework(student.id)}
                          aria-label="Edit Homework"
                        >
                          Edit
                        </button>

                        <button
                          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
                          onClick={() => handleDeleteHomework(student.id)}
                          aria-label="Delete Homework"
                        >
                          Delete
                        </button>

                        {/* <button
                          className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
                          onClick={() => handleSendReminder(student.id)}l
                          aria-label="Send Reminder"
                        >
                          Reminder

                        </button> */}
                      </div>
                    </td>
                    <td className="border px-6 py-4">
                      <div className="flex flex-wrap gap-3 justify-center">
                        <button
                          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                          onClick={()=>handleStudentClick(student.id)}
                          aria-label="Payment"
                        >
                          Payment
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal for Assign Homework */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-25 z-10"></div>
          <div className="fixed inset-0 flex justify-center items-center z-20">
            <Dialog.Panel className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
              <Dialog.Title className="text-2xl font-semibold text-center mb-4">
                Assign Homework
              </Dialog.Title>

              {/* Student Selection */}
              <div>
                <label className="block text-gray-700">Select Student</label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full p-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500"
                  aria-label="Select Student"
                >
                  <option value="" disabled>
                    Select student
                  </option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Selection */}
              <div className="mt-4">
                <label className="block text-gray-700">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500"
                  aria-label="Select Subject"
                >
                  <option value="">Select subject</option>
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                </select>
              </div>

              {/* Submission Date */}
              <div className="mt-4">
                <label className="block text-gray-700">Submission Date</label>
                <input
                  type="date"
                  value={submissionDate}
                  onChange={(e) => setSubmissionDate(e.target.value)}
                  className="w-full p-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500"
                  aria-label="Select Submission Date"
                />
              </div>

              {/* Status Selection */}
              <div className="mt-4">
                <label className="block text-gray-700">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500"
                  aria-label="Select Status"
                >
                  <option value="Pending">Pending</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Submitted">Submitted</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={handleAssignHomework}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
                  aria-label="Submit Assignment"
                >
                  Assign
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
