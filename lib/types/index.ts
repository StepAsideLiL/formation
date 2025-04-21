type TError = {
  message: string;
} | null;

export type TResponse<TData = unknown> = {
  error: TError;
  data: TData;
};
