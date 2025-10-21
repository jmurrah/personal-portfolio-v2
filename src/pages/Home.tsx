export default function Home() {
  return (
    <>
      <div className="max-w-screen w-full h-screen flex justify-center items-center p-8">
        <div className="bg-red-500 max-w-xl w-full flex h-80">
          <div className="flex flex-col">
            <div>
              <h1>Jacob Murrah</h1>
              <p>Location: Atlanta, GA</p>
              <p>Full Stack Developer</p>
              <p>2+ Years of Work Experience</p>
              <p>Email: jacob@murrah.dev</p>
            </div>
            <div className="flex gap-4">
              <p>l1</p>
              <p>l2</p>
              <p>l3</p>
              <p>l4</p>
              <p>l5</p>
            </div>
            <div className="flex gap-4">
              <p>skill1</p>
              <p>skill2</p>
              <p>skill3</p>
              <p>skill4</p>
              <p>skill5</p>
            </div>
          </div>
          <img src="/JacobMurrahWaterfall.jpg" alt="Jacob Murrah" />
        </div>
        <div>
          <div>
            <p>light/dark mode toggle</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>About</p>
            <p>Experience</p>
            <p>Education</p>
            <p>Projects</p>
            <p>Resume</p>
          </div>
        </div>
      </div>
    </>
  );
}
