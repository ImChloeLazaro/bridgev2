import {
  MdDashboard,
  MdPerson,
  MdCampaign,
  MdGroup,
  MdDiversity3,
  MdCalendarMonth,
  MdArticle,
  MdContactMail,
  MdAdminPanelSettings,
  MdSwitchAccount,
  MdHelp,
  MdPersonSearch,
  MdMarkunreadMailbox,
  MdEmojiEvents,
  MdAirlineSeatIndividualSuite,
  MdDirectionsRun,
  MdOtherHouses,
} from "react-icons/md";
import { BsPersonCheckFill } from "react-icons/bs";

import AretexWebsite from "../../../public/Aretex.svg";
import AretexMeet from "../../../public/Aretex Meet.svg";
import AretexChat from "../../../public/Aretex Chat.svg";
import AretexTeach from "../../../public/Aretex Teach.svg";
import AretexUniversity from "../../../public/Aretex University.svg";
import Image from "next/image";

const ExternalLinksIcons = {
  base: <Image src={AretexWebsite} alt="Aretex Softwares"></Image>,
  meet: <Image src={AretexMeet} alt="Aretex Softwares"></Image>,
  chat: <Image src={AretexChat} alt="Aretex Softwares"></Image>,
  teach: <Image src={AretexTeach} alt="Aretex Softwares"></Image>,
  university: <Image src={AretexUniversity} alt="Aretex Softwares"></Image>,
};

const size = 22;

const SideBarIcons = {
  home: <MdOtherHouses size={size} />,
  dashboard: <MdDashboard size={size} />,
  profile: <MdPerson size={size} />,
  cms: <MdArticle size={size} />,
  empower: <MdCampaign size={size} />,
  employees: <MdGroup size={size} />,
  team_mngt: <MdDiversity3 size={size} />,
  schedule: <MdCalendarMonth size={size} />,
  appraisals: <BsPersonCheckFill size={size} />,
  clients: <MdContactMail size={size} />,
  accounts: <MdSwitchAccount size={size} />,
  user_roles: <MdAdminPanelSettings size={size} />,
  it_help_desk: <MdHelp size={size} />,
  pre_employment: <MdPersonSearch size={size} />,
  onboarding: <MdMarkunreadMailbox size={size} />,
  team_endorse: <MdDiversity3 size={size} />,
  benefits: <MdEmojiEvents size={size} />,
  leaves: <MdAirlineSeatIndividualSuite size={size} />,
  offboarding: <MdDirectionsRun size={size} />,
};

export const routesUser = [
  {
    key: "home",
    label: "Home",
    link: "/user",
    icon: SideBarIcons.home,
  },
  {
    key: "profile",
    label: "Profile",
    link: "/user/profile",
    icon: SideBarIcons.profile,
  },
  {
    key: "dashboard",
    label: "Dashboard",
    link: "/user/dashboard",
    icon: SideBarIcons.dashboard,
  },
  {
    key: "cms",
    label: "CMS",
    link: "/user/cms",
    icon: SideBarIcons.cms,
  },
  {
    key: "empower",
    label: "Empower",
    link: "/user/empower",
    icon: SideBarIcons.empower,
  },
];

export const routesAdmin = [
  {
    key: "admin",
    label: "Dashboard",
    link: "/admin",
    icon: SideBarIcons.dashboard,
  },
  {
    key: "team",
    label: "Team Management",
    link: "/admin/team",
    icon: SideBarIcons.team_mngt,
  },
  {
    key: "clients",
    label: "Clients",
    link: "/admin/clients",
    icon: SideBarIcons.clients,
  },
  {
    key: "appraisals",
    label: "Appraisals",
    link: "/admin/appraisals",
    icon: SideBarIcons.appraisals,
  },
  {
    key: "roles",
    label: "User Roles",
    link: "/admin/roles",
    icon: SideBarIcons.user_roles,
  },
  {
    key: "help_desk",
    label: "IT Help Desk",
    link: "/admin/help_desk",
    icon: SideBarIcons.it_help_desk,
  },
];

export const routesTeamLead = [
  {
    key: "team_lead",
    label: "Dashboard",
    link: "/tl",
    icon: SideBarIcons.dashboard,
  },
  {
    key: "cms",
    label: "CMS",
    link: "/tl/cms",
    icon: SideBarIcons.cms,
  },
  {
    key: "team",
    label: "Team Management",
    link: "/tl/team",
    icon: SideBarIcons.team_mngt,
  },
  {
    key: "schedule",
    label: "Schedule",
    link: "/tl/schedule",
    icon: SideBarIcons.schedule,
  },
  {
    key: "appraisals",
    label: "Appraisals",
    link: "/tl/appraisals",
    icon: SideBarIcons.appraisals,
  },
];

export const routesHR = [
  {
    key: "hr",
    label: "Dashboard",
    link: "/hr",
    icon: SideBarIcons.dashboard,
  },
  {
    key: "pre_employment",
    label: "Pre-Employment",
    link: "/hr/pre_employment",
    icon: SideBarIcons.pre_employment,
  },
  {
    key: "onboarding",
    label: "Onboarding",
    link: "/hr/onboarding",
    icon: SideBarIcons.onboarding,
  },
  {
    key: "team_endorse",
    label: "Team Endorsement",
    link: "/hr/endorse",
    icon: SideBarIcons.team_endorse,
  },
  {
    key: "employees",
    label: "Employees",
    link: "/hr/employees",
    icon: SideBarIcons.employees,
  },
  {
    key: "benefits",
    label: "Benefits",
    link: "/hr/benefits",
    icon: SideBarIcons.benefits,
  },
  {
    key: "leaves",
    label: "Leaves",
    link: "/hr/leaves",
    icon: SideBarIcons.leaves,
  },
  {
    key: "offboarding",
    label: "Offboarding",
    link: "/hr/offboarding",
    icon: SideBarIcons.offboarding,
  },
];

export const externalLinks = [
  {
    key: "base-AU",
    label: "Aretex AU",
    link: "https://aretex.com.au",
    icon: ExternalLinksIcons.base,
  },
  {
    key: "base-PH",
    label: "Aretex PH",
    link: "https://aretex.ph/",
    icon: ExternalLinksIcons.base,
  },
  {
    key: "meet",
    label: "Meet",
    link: "https://meet.vps-aretex.space/",
    icon: ExternalLinksIcons.meet,
  },
  {
    key: "chat",
    label: "Chat",
    link: "https://hypnotic-scene-production.up.railway.app/",
    icon: ExternalLinksIcons.chat,
  },
  {
    key: "teach",
    label: "Teach",
    link: "https://aretexteach.com/",
    icon: ExternalLinksIcons.teach,
  },
  {
    key: "university",
    label: "University",
    link: "https://aretex-lms.fun/",
    icon: ExternalLinksIcons.university,
  },
];
