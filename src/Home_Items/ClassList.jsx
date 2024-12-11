import React from "react";

const ClassList = () => {
  // Mock data for classes
  const classes = [
    {
      id: 1,
      subject: "Biology",
      faculty: "Dr. Sarah Johnson",
      videoLink: "https://www.youtube.com/embed/j2m4hkOJR2M",
    },
    {
      id: 2,
      subject: "Physics",
      faculty: "Ms. Emily Davis",
      videoLink: "https://www.youtube.com/embed/1TjOm1m38tA",
    },
    {
      id: 3,
      subject: "English IELTS",
      faculty: "Miss EMMAA",
      videoLink: "https://www.youtube.com/embed/sRFEKvsw-vs?list=RDQMvYpE4p3_yV8",
    },
    {
      id: 4,
      subject: "Algebra(H),121",
      faculty: "Dr. Robert Brown",
      videoLink: "https://www.youtube.com/embed/LwCRRUa8yTU",
    },
    {
      id: 5,
      subject: "Chemistry and Biochemistry",
      faculty: "Pankaj Sir",
      videoLink: "https://www.youtube.com/embed/J7Zb9Uv0eRg",
    },
    {
      id: 6,
      subject: "Computer Science",
      faculty: "Hitesh Chaudhury Sir",
      videoLink: "https://www.youtube.com/embed/xrj3zzaqODw",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Class List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition"
          >
            <iframe
              src={classItem.videoLink}
              title={classItem.subject}
              className="w-full h-48 rounded-lg mb-4"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h2 className="text-xl font-semibold text-gray-700">
              {classItem.subject}
            </h2>
            <p className="text-gray-500 mt-2">
              Faculty: <span className="font-medium">{classItem.faculty}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassList;
