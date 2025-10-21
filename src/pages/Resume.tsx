export default function Resume() {
  return (
    <iframe
      src={`${import.meta.env.BASE_URL}JacobMurrahResume.pdf`}
      style={{ width: '100%', height: '100vh', border: 'none' }}
    />
  );
}
