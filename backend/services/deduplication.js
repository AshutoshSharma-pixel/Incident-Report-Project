const DISTANCE_THRESHOLD = 0.002; // ~200m latitude diff

export const checkDuplicate = (incidents, location, type) => {
  return incidents.find((incident) => {
    const latDiff = Math.abs(incident.location.lat - location.lat);
    const lngDiff = Math.abs(incident.location.lng - location.lng);

    return (
      latDiff < DISTANCE_THRESHOLD &&
      lngDiff < DISTANCE_THRESHOLD &&
      incident.type === type
    );
  });
};
