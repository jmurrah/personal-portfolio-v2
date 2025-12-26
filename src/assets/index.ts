import AdtranLogo from '@/assets/logos/AdtranLogo.webp';
import AttLogo from '@/assets/logos/AT&TLogo.webp';
import AuburnEngineeringLogo from '@/assets/logos/AuburnEngineeringLogo.webp';
import AuburnLogo from '@/assets/logos/AuburnLogo.webp';
import AwsLogo from '@/assets/logos/AWSLogo.svg';
import DockerLogo from '@/assets/logos/DockerLogo.svg';
import FastApiLogo from '@/assets/logos/FastAPILogo.svg';
import GitLogo from '@/assets/logos/GitLogo.svg';
import GoLogo from '@/assets/logos/GoLogo.svg';
import GoogleCloudLogo from '@/assets/logos/GoogleCloudLogo.svg';
import GeorgiaTechLogo from '@/assets/logos/GTechLogo.webp';
import Is4sLogo from '@/assets/logos/IS4SLogo.webp';
import JavaLogo from '@/assets/logos/JavaLogo.svg';
import MongoDbLogo from '@/assets/logos/MongoDbLogo.svg';
import PostmanLogo from '@/assets/logos/PostmanLogo.svg';
import PythonLogo from '@/assets/logos/PythonLogo.svg';
import ReactLogo from '@/assets/logos/ReactLogo.svg';
import SpringLogo from '@/assets/logos/SpringLogo.svg';
import SupabaseLogo from '@/assets/logos/SupabaseLogo.svg';
import TailwindLogo from '@/assets/logos/TailwindLogo.svg';
import TypeScriptLogo from '@/assets/logos/TypeScriptLogo.svg';

import BriefcaseIcon from '@/assets/icons/BriefcaseIcon.svg';
import CalendarIcon from '@/assets/icons/CalendarIcon.svg';
import CodeIcon from '@/assets/icons/CodeIcon.svg';
import CoffeeIcon from '@/assets/icons/CoffeeIcon.svg';
import FileDownloadIcon from '@/assets/icons/FileDownloadIcon.svg';
import GitHubIcon from '@/assets/icons/GitHubIcon.svg';
import LeetCodeIcon from '@/assets/icons/LeetCodeIcon.svg';
import LinkedInIcon from '@/assets/icons/LinkedInIcon.svg';
import MailIcon from '@/assets/icons/MailIcon.svg';
import MapPinIcon from '@/assets/icons/MapPinIcon.svg';
import MenuIcon from '@/assets/icons/MenuIcon.svg';
import MoonIcon from '@/assets/icons/MoonIcon.svg';
import ProfileIcon from '@/assets/icons/ProfileIcon.svg';
import ProjectIcon from '@/assets/icons/ProjectIcon.svg';
import SunIcon from '@/assets/icons/SunIcon.svg';
import BlogIcon from '@/assets/icons/BlogIcon.svg';
import ArrowUpRightIcon from '@/assets/icons/ArrowUpRightIcon.svg';
import PaintIcon from '@/assets/icons/PaintIcon.svg';
import ClockIcon from '@/assets/icons/ClockIcon.svg';

import CatsPhoto from '@/assets/photos/Cats.jpg';
import GymPhoto from '@/assets/photos/Gym.png';
import InternDayPhoto from '@/assets/photos/InternDay.jpg';
import WeddingPhoto from '@/assets/photos/Wedding.jpg';
import VolleyballPhoto from '@/assets/photos/Volleyball.jpg';
import WaterfallPhoto from '@/assets/photos/Waterfall.jpg';
import GraduationHeadshotPhoto from '@/assets/photos/GraduationHeadshot.jpg';

import BuzzIcon from '@/assets/icons/BuzzIcon.png';
import AubieIcon from '@/assets/icons/AubieIcon.png';

import Memoji from '@/assets/memoji/Memoji.png';

export const LOGOS = {
  adtran: AdtranLogo,
  att: AttLogo,
  auburnEngineering: AuburnEngineeringLogo,
  auburn: AuburnLogo,
  aws: AwsLogo,
  docker: DockerLogo,
  fastApi: FastApiLogo,
  git: GitLogo,
  go: GoLogo,
  googleCloud: GoogleCloudLogo,
  georgiaTech: GeorgiaTechLogo,
  is4s: Is4sLogo,
  java: JavaLogo,
  mongoDb: MongoDbLogo,
  postman: PostmanLogo,
  python: PythonLogo,
  react: ReactLogo,
  spring: SpringLogo,
  supabase: SupabaseLogo,
  tailwind: TailwindLogo,
  typeScript: TypeScriptLogo,
} as const;

export const ICONS = {
  briefcase: BriefcaseIcon,
  calendar: CalendarIcon,
  code: CodeIcon,
  coffee: CoffeeIcon,
  fileDownload: FileDownloadIcon,
  gitHub: GitHubIcon,
  leetCode: LeetCodeIcon,
  linkedIn: LinkedInIcon,
  mail: MailIcon,
  arrowUpRight: ArrowUpRightIcon,
  mapPin: MapPinIcon,
  menu: MenuIcon,
  moon: MoonIcon,
  paint: PaintIcon,
  profile: ProfileIcon,
  project: ProjectIcon,
  sun: SunIcon,
  blog: BlogIcon,
  aubie: AubieIcon,
  buzz: BuzzIcon,
  clock: ClockIcon,
} as const;

export const PHOTOS = {
  cats: CatsPhoto,
  gym: GymPhoto,
  internDay: InternDayPhoto,
  wedding: WeddingPhoto,
  volleyball: VolleyballPhoto,
  waterfall: WaterfallPhoto,
  graduationHeadshot: GraduationHeadshotPhoto,
} as const;

export const MEMOJI = {
  memoji: Memoji,
} as const;

export const ALL_ASSET_PATHS = [
  ...Object.values(LOGOS),
  ...Object.values(ICONS),
  ...Object.values(PHOTOS),
  ...Object.values(MEMOJI),
] as readonly string[];
