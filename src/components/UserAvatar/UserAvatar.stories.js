import UserAvatar from "./UserAvatar.tsx";
const meta = {
    title: "Components/User avatar",
    component: UserAvatar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    args: {
        fullName: "Kelvin Kiptum",
    },
};
export const Mark = {
    args: {
        fullName: "Kelvin Kiptum",
        mark: true,
    },
};
export const Verified = {
    args: {
        fullName: "Kelvin Kiptum",
        verified: true,
        textWidth: "auto",
    },
};
export const CustomColor = {
    args: {
        fullName: "Kelvin Kiptum",
        color: "green",
    },
};
export const Small = {
    args: {
        fullName: "Kelvin Kiptum",
        size: "small",
    },
};
export const Large = {
    args: {
        fullName: "Kelvin Kiptum",
        size: "large",
    },
};
