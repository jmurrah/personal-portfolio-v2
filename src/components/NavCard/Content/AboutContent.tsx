import { PHOTOS } from '@/assets';
import { ImageStack, type ImageStackItem } from '@/components/ImageStack';

const aboutImages: ImageStackItem[] = [
  {
    src: PHOTOS.waterfall,
    alt: 'Standing at the base of a waterfall during a hike',
  },
  {
    src: PHOTOS.wedding,
    alt: 'Sharing a moment after the wedding ceremony',
  },
  {
    src: PHOTOS.cats,
    alt: 'Jacob with a cat lounging on the couch',
  },
  {
    src: PHOTOS.internDay,
    alt: 'Posing with the AT&T internship cohort',
  },
  {
    src: PHOTOS.volleyball,
    alt: 'After a sand volleyball match with friends',
  },
  {
    src: PHOTOS.gym,
    alt: 'Celebrating a new personal record at the gym',
  },
];

export default function AboutContent() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 mt-[-30px]">
      <div className="w-full flex justify-center">
        <ImageStack images={aboutImages} />
      </div>
      <div className="flex w-full justify-center">
        <div className="flex max-w-2xl flex-col gap-4 text-base leading-relaxed">
          <p>
            Hello! I am <strong>Jacob Murrah</strong>, a <strong>software engineer</strong> who
            desires <strong>simplicity</strong> and <strong>speed</strong> in my daily life and in
            the way I write code. I am currently a student at{' '}
            <a
              className="underline decoration-primary decoration-2 underline-offset-4 transition hover:text-primary"
              href="https://www.auburn.edu/"
              title="Auburn"
              target="_blank"
              rel="noreferrer"
            >
              <span className="underline">Auburn University</span>
            </a>{' '}
            pursuing a <strong>Bachelor&apos;s degree</strong> in{' '}
            <a
              className="underline decoration-primary decoration-2 underline-offset-4 transition hover:text-primary"
              href="https://bulletin.auburn.edu/undergraduate/samuelginncollegeofengineering/departmentofcomputerscienceandsoftwareengineering/softwareengineering_major/"
              title="Software engineer"
              target="_blank"
              rel="noreferrer"
            >
              <span className="underline">Software Engineering</span>
            </a>
            . I have a passion for <strong>full stack</strong> development and writing{' '}
            <strong>clean code</strong>. My goal is to have a <strong>deep understanding</strong> of
            how modern applications are built, interacted with, and maintained.
          </p>
          <p>
            To date, I have had the privilege of collaborating with various teams and engineers
            during my time at{' '}
            <a
              className="underline decoration-primary decoration-2 underline-offset-4 transition hover:text-primary"
              href="https://is4s.com/"
              title="IS4S"
              target="_blank"
              rel="noreferrer"
            >
              <span className="underline">IS4S</span>
            </a>
            , throughout my <strong>3 co-op terms</strong> at{' '}
            <a
              className="underline decoration-primary decoration-2 underline-offset-4 transition hover:text-primary"
              href="https://www.adtran.com/"
              title="Adtran"
              target="_blank"
              rel="noreferrer"
            >
              <span className="underline">Adtran</span>
            </a>
            , and during my summer <strong>internship</strong> at{' '}
            <a
              className="underline decoration-primary decoration-2 underline-offset-4 transition hover:text-primary"
              href="https://www.att.com/"
              title="AT&T"
              target="_blank"
              rel="noreferrer"
            >
              <span className="underline">AT&amp;T</span>
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
