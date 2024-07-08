export const getRuntime = (runtime: number) => {
  const hrs = Math.floor(runtime / 60);
  const mins = Math.ceil(runtime % 60);
  return `${hrs}h ${mins}m`
}