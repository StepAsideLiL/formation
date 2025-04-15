export type TResponse<TError = unknown, TData = unknown> = {
  error: TError;
  data: TData;
};
