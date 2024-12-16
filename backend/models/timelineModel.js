let timeline = [
  { date: new Date().toISOString(), event: 'Verification request submitted.' },
  { date: new Date().toISOString(), event: 'Verification in progress.' },
];

// Function to get the timeline data
export const getTimelineData = () => {
  return new Promise((resolve) => {
    resolve(timeline);
  });
};

