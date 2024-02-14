import { FC } from 'react'

interface HistoryCardProps {
  user: {
    createdAt: string
    deliveredTiffin: number
    pickedTiffin: number
  }
}

const HistoryCard: FC<HistoryCardProps> = ({ user }) => {
  const parsedDate = new Date(user.createdAt);
  const dateObject = new Date(parsedDate);

const month = dateObject.toLocaleString('default', { month: 'short' }); // Get abbreviated month name
const day = dateObject.getDate(); // Get day of the month
const year = dateObject.getFullYear(); // Get full year

const formattedDate = `${month} ${day} ${year}`;
  let hours = parsedDate.getHours();
  let minutes: number | string = parsedDate.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const time = hours + ":" + minutes + " " + ampm;
  return (
    <div className="mt-5 bg-white rounded-xl flex text-2xl py-5 px-16">
      <h1 className="w-[25%] text-center">{time}</h1>
      <h1 className="w-[25%] text-center">{formattedDate}</h1>
      <h1 className="w-[25%] text-center">{user.deliveredTiffin}</h1>
      <h1 className="w-[25%] text-center">{user.pickedTiffin}</h1>
      <h1 className="w-[25%] text-center">{user.deliveredTiffin - user.pickedTiffin}</h1>
    </div>
  );
}

export default HistoryCard
