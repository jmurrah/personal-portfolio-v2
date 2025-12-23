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
        <div className="flex max-w-3xl flex-col gap-4">
          <p>
            Hello! I am Jacob Murrah, a software engineer who desires simplicity and speed in my
            daily life and in the way I write code. I am currently a student at{' '}
            <a
              className="underline-fill"
              href="https://www.auburn.edu/"
              title="Auburn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Auburn University
            </a>{' '}
            pursuing a Bachelor&apos;s degree in{' '}
            <a
              className="underline-fill"
              href="https://bulletin.auburn.edu/undergraduate/samuelginncollegeofengineering/departmentofcomputerscienceandsoftwareengineering/softwareengineering_major/"
              title="Software engineer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Software Engineering
            </a>
            . I have a passion for full stack development and writing clean code. My goal is to have
            a deep understanding of how modern applications are built, interacted with, and
            maintained.
          </p>
          <p>
            To date, I have had the privilege of collaborating with various teams and engineers
            during my time at{' '}
            <a
              className="underline-fill"
              href="https://is4s.com/"
              title="IS4S"
              target="_blank"
              rel="noopener noreferrer"
            >
              IS4S
            </a>
            , throughout my 3 co-op terms at{' '}
            <a
              className="underline-fill"
              href="https://www.adtran.com/"
              title="Adtran"
              target="_blank"
              rel="noopener noreferrer"
            >
              Adtran
            </a>
            , and during my summer internship at{' '}
            <a
              className="underline-fill"
              href="https://www.att.com/"
              title="AT&T"
              target="_blank"
              rel="noopener noreferrer"
            >
              AT&amp;T
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
