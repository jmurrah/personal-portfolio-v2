import TimeLine from '@/components/TimeLine/TimeLine';
import TimeLineItem from '@/components/TimeLine/TimeLineItem';

export default function EducationContent() {
  return (
    <TimeLine>
      <TimeLineItem
        href="https://www.gatech.edu/"
        imgSrc="/logos/GTechLogo.jpg"
        imgAlt="Georgia Institute of Technology"
        timeStart="January 2026"
        timeEnd="December 2028"
        title="Georgia Institute of Technology"
        subtitle="M.S. in Computer Science"
        bulletPoints={['Incoming Spring 2026', 'Specialization in Machine Learning', '4.00 GPA']}
      />
      <TimeLineItem
        href="https://www.auburn.edu/"
        imgSrc="/logos/AuburnLogo.jpg"
        imgAlt="Auburn University"
        timeStart="April 2021"
        timeEnd="December 2025"
        title="Auburn University"
        subtitle="B.E. in Software Engineering"
        bulletPoints={[
          'Certificate in Artificial Intelligence',
          'Competitive Programming Team',
          '3.93 GPA',
        ]}
      />
    </TimeLine>
  );
}
