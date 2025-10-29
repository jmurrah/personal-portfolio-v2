// make the first element the image slider CanvasCaptureMediaStreamTrack. like mutliple images click through

export default function AboutContent() {
  return (
    // <div className="flex gap-4 justify-center items-center">
    //   {/* <img></img> */}
    //   <p></p>
    // </div>
    <div className="flex gap-4 justify-center items-center">
      <div id="abt-inner" className="flex gap-4">
        <div id="abt-desc" className="flex flex-col">
          <p>
            Hello Again! I am <strong>Jacob</strong>, a <strong>software engineer</strong> who
            desires <strong>simplicity</strong> and <strong>speed</strong> in my daily life and in
            the way I write code. I am currently a student at
            <a
              className="text-primary-purple"
              href="https://www.auburn.edu/"
              title="Auburn"
              target="_blank"
              rel="noreferrer"
            >
              Auburn University
            </a>
            pursuing a <strong>Bachelor's degree</strong> in
            <a
              className="text-primary-purple"
              href="https://bulletin.auburn.edu/undergraduate/samuelginncollegeofengineering/departmentofcomputerscienceandsoftwareengineering/softwareengineering_major/"
              title="Software engineer"
              target="_blank"
              rel="noreferrer"
            >
              Software Engineering
            </a>
            . I have a passion for
            <strong>full stack</strong>
            development and writing <strong>clean code</strong>. My goal is to have a
            <strong>deep understanding</strong> of how modern applications are built, interacted
            with, and maintained. <br />
            <br />
            To date, I have had the privilege of collaborating with various teams and engineers
            during my time at
            <a
              className="text-primary-purple"
              href="https://is4s.com/"
              title="IS4S"
              target="_blank"
              rel="noreferrer"
            >
              IS4S
            </a>
            , throughout my <strong>3 co-op terms</strong> at
            <a
              className="text-primary-purple"
              href="https://www.adtran.com/"
              title="Adtran"
              target="_blank"
              rel="noreferrer"
            >
              Adtran
            </a>
            , and during my summer <strong>internship</strong> at
            <a
              className="text-primary-purple"
              href="https://www.att.com/"
              title="AT&T"
              target="_blank"
              rel="noreferrer"
            >
              AT&T
            </a>
            .
            <br />
            <br />
            Here are a few technologies I've been working with recently:
          </p>
          <div className="flex mt-4 w-full">
            <ul className="mr-auto flex flex-wrap gap-x-4 gap-y-2">
              <li className="tag">Python</li>
              <li className="tag">Go</li>
              <li className="tag">TypeScript</li>
              <li className="tag">AWS</li>
              <li className="tag">Docker</li>
              <li className="tag">SQL</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
