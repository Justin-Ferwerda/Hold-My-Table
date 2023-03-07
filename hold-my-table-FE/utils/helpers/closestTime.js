import moment from 'moment';
import timeOptions from '../data/options/timeOptions';

export default function closestTime() {
  const moments = timeOptions.map((option) => moment(option.value, 'HH:mm:ss'));
  const sortedMoments = moments.sort((a, b) => Math.abs(a.diff(moment())) - Math.abs(b.diff(moment())));
  return sortedMoments[2].format('HH:mm:ss');
}
