import { Timeline, PeopleAltOutlined, PendingOutlined, ThumbUpAlt, DoDisturb } from "@mui/icons-material";
const primaryColor = "#FFF";
const secondaryColor = "#007ACC";
const textColor = "#000";
const shadowColor = "#F1F1F1";

const sidebarData = [
    {
        icon: Timeline,
        heading: "Analyses",
    },
    {
        icon: PeopleAltOutlined,
        heading: "Clients",
    },
    {
        icon: PendingOutlined,
        heading: "En attente",
    },
    {
        icon: ThumbUpAlt,
        heading: "Accepté",
    },
    {
        icon: DoDisturb,
        heading: "Rejeté",
    },

]

const CardsData = [
    {
        title: 'Annonces Totales',
        value: '254'
    },
    {
        title: 'Total D\'utilisateurs',
        value: '1,780'
    },
    {
        title: 'Utilisateurs Premium',
        value: '54'
    },
]

const UpdatesData = [
    {
        name: "Andrew Thomas",
        time: "25 seconds ago",
    },
    {
        name: "James Bond",
        time: "30 minutes ago",
    },
    {
        name: "James Reece",
        time: "2 hours ago",
    }
]

export {primaryColor, secondaryColor, textColor, shadowColor, sidebarData, UpdatesData, CardsData}