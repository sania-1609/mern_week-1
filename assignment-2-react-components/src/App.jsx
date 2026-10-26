
import { useState } from "react";
import "./App.css";

function Header() {
  return (
    <header className="header">
      <h1>React Components</h1>
      <p>Assignment 2 - Full Stack Web Development</p>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 My React Assignment</p>
    </footer>
  );
}

function Card({ title, description }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function Button({ text, onClick }) {
  return (
    <button className="custom-button" onClick={onClick}>
      {text}
    </button>
  );
}

function Form({ onAdd }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !course.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    onAdd(name, course);
    setName("");
    setCourse("");
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Add a Student</h2>

      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="text"
        placeholder="Enter course name"
        value={course}
        onChange={(event) => setCourse(event.target.value)}
      />

      <button type="submit" className="custom-button">
        Add Student
      </button>
    </form>
  );
}

function App() {
  const [students, setStudents] = useState([
    { name: "Student One", course: "React Basics" },
    { name: "Student Two", course: "JavaScript" }
  ]);

  const [count, setCount] = useState(0);

  function addStudent(name, course) {
    setStudents([...students, { name, course }]);
  }

  return (
    <>
      <Header />

      <main className="container">
        <h2>Reusable Components</h2>

        <div className="card-grid">
          <Card
            title="Header Component"
            description="Displays the assignment heading."
          />
          <Card
            title="Card Component"
            description="Displays reusable content using props."
          />
          <Card
            title="Form Component"
            description="Accepts student information using state."
          />
        </div>

        <section className="demo-section">
          <h2>Button Component</h2>
          <p>Button clicked: {count} times</p>
          <Button
            text="Click Me"
            onClick={() => setCount(count + 1)}
          />
        </section>

        <section className="demo-section">
          <Form onAdd={addStudent} />
        </section>

        <section className="demo-section">
          <h2>Student List</h2>

          <div className="card-grid">
            {students.map((student, index) => (
              <Card
                key={index}
                title={student.name}
                description={student.course}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
