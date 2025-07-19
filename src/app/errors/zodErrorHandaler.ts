import { ZodError } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const zodErrorHandler = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue) => {
    return {
      path: String(issue?.path[issue?.path.length - 1] ?? ''), 
      message: issue?.message,
    };
  });

  return {
    statusCode: 400,
    message: 'Validation error',
    errorSources,
  };
};

export default zodErrorHandler;
