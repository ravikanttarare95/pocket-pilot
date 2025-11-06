import { Phone, Mail } from "lucide-react";
import { SiPeerlist } from "react-icons/si";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const SOCIAL_ICONS = [
  {
    icon: FaGithub,
    goTo: "https://github.com/ravikanttarare95/pocket-pilot.git",
  },
  {
    icon: FaLinkedin,
    goTo: "https://www.linkedin.com/in/ravikant-tarare-7843b31b0",
  },
  {
    icon: SiPeerlist,
    goTo: "https://peerlist.io/ravikanttarare",
  },
];

const QUICK_LINKS = [
  {
    name: "Home",
    goTo: "/",
  },
  {
    name: "Dashboard",
    goTo: "/dashboard",
  },
];

const CONTACT_INFO = [
  {
    title: "+91 82759 57698",
    goTo: "tel:8275957698",
    icon: Phone,
  },
  {
    title: "ravikanttarare2001@gmail.com",
    goTo: "mailto:ravikanttarare2001@gmail.com",
    icon: Mail,
  },
];

export { SOCIAL_ICONS, QUICK_LINKS, CONTACT_INFO };
