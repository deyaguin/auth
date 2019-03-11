type RequestFunction = (config: any, actionName: string) => (params?: any, action?: any) => void;

export default RequestFunction;
