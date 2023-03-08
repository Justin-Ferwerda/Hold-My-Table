import moment from 'moment';
import timeOptions from '../data/options/timeOptions';

export default function closestTime() {
  const moments = timeOptions.map((option) => moment(option.value, 'HH:mm:ss'));
  const sortedMoments = moments.sort((a, b) => Math.abs(a.diff(moment())) - Math.abs(b.diff(moment())));
  const filteredMoments = sortedMoments.filter((mom) => moment() < mom);
  console.warn(filteredMoments.map((mom) => mom.format('HH:mm:ss')));
  return filteredMoments[0].format('HH:mm:ss');
}
