import React from "react";

const email: string = "joshuachen0724@gmail.com";

const CoverLetter: React.FC = () => {
  return (
    <div style={styles.container}>
      <p style={styles.paragraph}>
        Dear InnoCaption Acquisition/Recruiting Team,
      </p>
      <p style={styles.paragraph}>
        I am writing to express my strong interest in your Summer 2024 SWE
        Internship. I believe that this program would provide an exceptional
        opportunity for me to enhance my skills and knowledge in computer
        science. With my strong curiosity for computer and software technology
        and this program’s hands-on experience in software development, I will
        approach this internship with my utmost effort.
      </p>
      <p style={styles.paragraph}>
        I am currently in my sophomore year of college, pursuing a Bachelor of
        Science degree in Computer Science at the University of San Diego, where
        I have maintained a 3.9 GPA. My coursework has provided me with a strong
        foundation in programming, computer systems, data structures,
        algorithms, and software development. This program would provide the
        real-world applications of these concepts that I’ve been looking for.
      </p>
      <p style={styles.paragraph}>
        In addition to my technical skills, I am a strong communicator and a
        quick learner. I am highly motivated, detail-oriented, and thrive in a
        collaborative environment. Based on my past experiences working in
        teams, I absolutely enjoy tackling challenges together with my peers and
        problem-solving as a group.
      </p>
      <p style={styles.paragraph}>
        Thank you for considering my application. I would welcome the
        opportunity to discuss how my skills and qualifications align with your
        company's needs via email at{" "}
        <a href={`mailto:${email}`} style={styles.link}>
          {email}
        </a>
        . I look forward to the possibility of joining your team and making
        meaningful contributions!
      </p>
      <p> Best,</p>
      <p> Joshua Chen</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  paragraph: {
    marginBottom: "15px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default CoverLetter;
