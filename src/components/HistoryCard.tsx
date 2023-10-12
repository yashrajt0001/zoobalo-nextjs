import { FC } from 'react'

interface HistoryCardProps {
  user: {
    id: number
    userId: number
    date: string
    dateTime: string
    delivered: number
    picked: number
  }
}

const HistoryCard: FC<HistoryCardProps> = ({ user }) => {
  const parsedDate = new Date(user.dateTime);
  let hours = parsedDate.getHours();
  let minutes: number | string = parsedDate.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  console.log(hours);
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const time = hours + ":" + minutes + " " + ampm;
  return (
    <div className="mt-5 bg-white rounded-xl flex text-2xl py-5 px-16">
      <h1 className="w-[25%] text-center">{time}</h1>
      <h1 className="w-[25%] text-center">{user.date}</h1>
      <h1 className="w-[25%] text-center">{user.delivered}</h1>
      <h1 className="w-[25%] text-center">{user.picked}</h1>
      <h1 className="w-[25%] text-center">{user.delivered - user.picked}</h1>
    </div>
  );
}

export default HistoryCard
