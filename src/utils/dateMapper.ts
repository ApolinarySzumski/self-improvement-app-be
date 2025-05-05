const padder = (item: number): string => item.toString().padStart(2, "0");

const frontEndDate = (date: string): string => {
  const decoy = new Date(date);
  return `${padder(decoy.getHours())}:${padder(decoy.getMinutes())} ${padder(decoy.getDate())}-${padder(decoy.getMonth() + 1)}-${decoy.getFullYear()}`;
};

export default frontEndDate;
