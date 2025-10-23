import TimeLine from '@/components/TimeLine/TimeLine';
import TimeLineItem from '@/components/TimeLine/TimeLineItem';

export default function ExperienceContent() {
  return (
    <TimeLine>
      <TimeLineItem
        href="https://www.att.com/"
        imgSrc="/logos/AT&TLogo.jpg"
        imgAlt="AT&T"
        timeStart="January 2026"
        timeEnd="Present"
        title="AT&T"
        subtitle="Software Engineer I"
        bulletPoints={['Incoming Spring 2026']}
      />
      <TimeLineItem
        href="https://www.eng.auburn.edu/"
        imgSrc="/logos/AuburnEngineeringLogo.jpg"
        imgAlt="Auburn University - Samuel Ginn College of Engineering"
        timeStart="August 2025"
        timeEnd="December 2025"
        title="Auburn University - Samuel Ginn College of Engineering"
        subtitle="Undergraduate Research Assistant"
        bulletPoints={['Working directly with Dr. Rongxuan (Raphael) Wang in the AMICS lab.']}
      />
      <TimeLineItem
        href="https://www.att.com/"
        imgSrc="/logos/AT&TLogo.jpg"
        imgAlt="AT&T"
        timeStart="June 2025"
        timeEnd="August 2025"
        title="AT&T"
        subtitle="Software Engineer Intern"
        bulletPoints={['Cricket Wireless Prepaid Mobile App Development.']}
      />
      <TimeLineItem
        href="https://www.adtran.com/en"
        imgSrc="/logos/AdtranLogo.jpg"
        imgAlt="Adtran"
        timeStart="May 2023"
        timeEnd="December 2024"
        title="Adtran"
        subtitle="Software Engineer Co-op"
        bulletPoints={['Mosaic One SaaS Platform for Network Management.']}
      />
      <TimeLineItem
        href="https://www.is4s.com/"
        imgSrc="/logos/IS4SLogo.jpg"
        imgAlt="IS4S"
        timeStart="January 2021"
        timeEnd="August 2022"
        title="Integrated Solutions for Systems (IS4S)"
        subtitle="Technician"
        bulletPoints={['Building vehicle decontamination systems for military use.']}
      />
    </TimeLine>
  );
}
