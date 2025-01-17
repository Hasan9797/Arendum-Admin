import PricingData from "../../../public/mocks/Pricing.json";
import PricingTable from "./PricingTable.tsx";
const meta = {
    title: "Components/Pricing table",
    component: PricingTable,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    args: {
        data: PricingData,
        style: { width: 1000 },
    },
};
export const Loading = {
    args: {
        loading: true,
        style: { width: 1000 },
    },
};
export const Error = {
    args: {
        error: "Error fetching items",
        style: { width: 1000 },
    },
};
