import React from "react";
import { useNavigate } from "react-router-dom";

const Homework = () => {
  const courses = [
    { name: "Biology" },
    { name: "Reading" },
    { name: "PE" },
    { name: "Algebra(H),121" },
    { name: "Chemistry and Biochemistry" },
    { name: "Computer Science" },
  ];

  const navigate = useNavigate();

  const handleViewAssignments = (courseName) => {
    console.log(`Navigating to Homework page for ${courseName}`);
    navigate(`/homework/${courseName.toLowerCase().replace(/\s/g, "-")}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Course</h3>
            <p className="text-xl font-bold text-gray-900 mb-4">
              {course.name}
            </p>
            <button
              onClick={() => handleViewAssignments(course.name)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full flex items-center justify-center space-x-2"
            >
              <i className="fas fa-eye"></i> {/* Eye icon */}
              <span>View Assignments</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homework;
