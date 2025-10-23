// Create this new file
import React from 'react';

export const AboutContent = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">About Me</h2>
    <p>
      I'm a Full Stack Software Developer with a passion for creating clean, efficient, and user-friendly
      applications. With a background in both frontend and backend development, I enjoy solving complex
      problems and building systems that make a difference.
    </p>
    <p className="mt-3">
      When I'm not coding, you can find me exploring new technologies, contributing to open-source
      projects, or enjoying outdoor activities.
    </p>
  </div>
);

export const ExperienceContent = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
    <div className="mb-6">
      <h3 className="text-lg font-medium">Software Engineer I @ AT&T</h3>
      <p className="text-sm opacity-70">Jan 2023 - Present</p>
      <ul className="list-disc pl-5 mt-2">
        <li>Developed and maintained full-stack applications using React and Java</li>
        <li>Optimized database queries resulting in 40% performance improvement</li>
        <li>Collaborated with cross-functional teams to deliver features on schedule</li>
      </ul>
    </div>
    <div>
      <h3 className="text-lg font-medium">Previous Position</h3>
      <p className="text-sm opacity-70">June 2021 - Dec 2022</p>
      <ul className="list-disc pl-5 mt-2">
        <li>Implemented responsive web designs</li>
        <li>Contributed to backend API development</li>
      </ul>
    </div>
  </div>
);

export const EducationContent = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">Education</h2>
    <div className="mb-6">
      <h3 className="text-lg font-medium">MS Computer Science</h3>
      <p className="font-medium">Georgia Tech</p>
      <p className="text-sm opacity-70">2023 - Present</p>
      <p className="mt-1">OMSCS Program - Specialization in Computing Systems</p>
    </div>
    <div>
      <h3 className="text-lg font-medium">BS Computer Science</h3>
      <p className="font-medium">University</p>
      <p className="text-sm opacity-70">2017 - 2021</p>
      <p className="mt-1">Graduated with Honors</p>
    </div>
  </div>
);

export const ProjectsContent = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">Projects</h2>
    <div className="mb-6">
      <h3 className="text-lg font-medium">Personal Portfolio</h3>
      <p className="mt-1">A responsive portfolio website built with React, TypeScript and CSS animations.</p>
      <div className="flex gap-2 mt-2">
        <span className="px-2 py-1 bg-blue-100 rounded text-xs">React</span>
        <span className="px-2 py-1 bg-blue-100 rounded text-xs">TypeScript</span>
        <span className="px-2 py-1 bg-blue-100 rounded text-xs">CSS</span>
      </div>
    </div>
    <div>
      <h3 className="text-lg font-medium">Project 2</h3>
      <p className="mt-1">Description of another significant project</p>
    </div>
  </div>
);

export const ResumeContent = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">Resume</h2>
    <p className="mb-4">Download my full resume to learn more about my experience and skills.</p>
    <a 
      href="/resume.pdf" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block px-4 py-2 bg-[color:var(--primary)] text-white rounded hover:opacity-90"
    >
      Download Resume
    </a>
  </div>
);