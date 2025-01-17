export type Pricing = {
  plan: string;
  monthly: number;
  annually: number;
  savings_caption: string;
  features: string[];
  color: string;
  preferred?: boolean;
};

export type PricingParamsType = {
  machineId: number;
  minAmount: string;
  minHourTime: string;
  tariffName: string;
  additionalParameters: [
    {
      parameter: string;
      parameterName: string;
      unit: string;
      type: string;
    },
  ];
};
