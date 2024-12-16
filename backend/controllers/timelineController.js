import { getTimelineData } from '../models/timelineModel.js';

export const getTimeline = async (req, res) => {
  try {
    const timeline = await getTimelineData();
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching timeline data' });
  }
};

