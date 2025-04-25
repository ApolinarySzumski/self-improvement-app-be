import { logger } from "../server.ts";

const getErrorMessage = (e: unknown) => {
    if (e instanceof Error) return e.message;
    return String(e);
};

const reportError = ({ message }: { message: string }) => {
    logger.info(`Error message: ${message}`);
}

const errorHandler = (e: unknown) => {
    reportError({ message: getErrorMessage(e) });
    return getErrorMessage(e);
}

export default errorHandler;

