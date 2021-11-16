export const removeTimeout = (timeout: NodeJS.Timeout | null) => {
  if (timeout) clearTimeout(timeout);
};
