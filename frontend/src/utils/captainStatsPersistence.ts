// Amount
export const saveAmount = (value: number) => {
  localStorage.setItem("captain_amount", value.toString());
};
export const getAmount = (): number => {
  const stored = localStorage.getItem("captain_amount");
  return stored ? Number(stored) : 0;
};

// Trip count
export const saveTrip = (value: number) => {
  localStorage.setItem("captain_trip", value.toString());
};
export const getTrip = (): number => {
  const stored = localStorage.getItem("captain_trip");
  return stored ? Number(stored) : 0;
};

// Distance travelled
export const saveDistanceTravelled = (value: number) => {
  localStorage.setItem("captain_distanceTravelled", value.toString());
};
export const getDistanceTravelled = (): number => {
  const stored = localStorage.getItem("captain_distanceTravelled");
  return stored ? Number(stored) : 0;
};

// Session start time
export const saveSessionStartTime = (value: number) => {
  localStorage.setItem("captain_sessionStartTime", value.toString());
};
export const getSessionStartTime = (): number => {
  const stored = localStorage.getItem("captain_sessionStartTime");
  return stored ? Number(stored) : Date.now();
};

export const clearCaptainStats = () => {
  localStorage.removeItem("captain_amount");
  localStorage.removeItem("captain_trip");
  localStorage.removeItem("captain_distanceTravelled");
  localStorage.removeItem("captain_sessionStartTime");
};