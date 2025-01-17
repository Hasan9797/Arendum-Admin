import { ReactNode } from "react";

export type SavedReportFilterType = {
    limit: number | string;
    sort: {
        column: string;
        value: string;
    };
    filters: [
        {
            column: string;
            value: string;
            operator: string;
        }
    ]
}

export type SavedReportTableType = {
    id: number;
    name: string;
    code: string | null;
    status: {
        int: number;
        string: string;
    };
    statusColumn: ReactNode;
    type: {
        int: number;
        string: string;
    };
    created_at: {
        dateTime: string
    }
    others: string
}

export type SavedReportParamsType = {
    user_id?: number | string | undefined;
    name: string;
    status: string | number;
    type: string | number;
    filters: null;
}