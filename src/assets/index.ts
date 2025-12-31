import CalendarIcon from '@/assets/icons/CalendarIcon.svg';
import CodeIcon from '@/assets/icons/CodeIcon.svg';
import GitHubIcon from '@/assets/icons/GitHubIcon.svg';
import LinkedInIcon from '@/assets/icons/LinkedInIcon.svg';
import MailIcon from '@/assets/icons/MailIcon.svg';
import MapPinIcon from '@/assets/icons/MapPinIcon.svg';
import MenuIcon from '@/assets/icons/MenuIcon.svg';
import MoonIcon from '@/assets/icons/MoonIcon.svg';
import SunIcon from '@/assets/icons/SunIcon.svg';
import ArrowUpRightIcon from '@/assets/icons/ArrowUpRightIcon.svg';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon.svg';
import PaintIcon from '@/assets/icons/PaintIcon.svg';
import ClockIcon from '@/assets/icons/ClockIcon.svg';
import ResumeIcon from '@/assets/icons/ResumeIcon.svg';

import GraduationHeadshotPhoto from '@/assets/photos/GraduationHeadshot.webp';

export const ICONS = {
  calendar: CalendarIcon,
  code: CodeIcon,
  gitHub: GitHubIcon,
  linkedIn: LinkedInIcon,
  mail: MailIcon,
  arrowUpRight: ArrowUpRightIcon,
  arrowRight: ArrowRightIcon,
  mapPin: MapPinIcon,
  menu: MenuIcon,
  moon: MoonIcon,
  sun: SunIcon,
  paint: PaintIcon,
  clock: ClockIcon,
  resume: ResumeIcon,
} as const;

export const PHOTOS = {
  graduationHeadshot: GraduationHeadshotPhoto,
} as const;
