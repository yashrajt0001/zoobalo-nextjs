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
  console.log(user)
  return (
    <div className="mt-5 bg-white rounded-xl flex text-2xl py-5 px-16">
      <h1 className="w-[25%] text-center">{user.date}</h1>
      <h1 className="w-[25%] text-center">{user.delivered}</h1>
      <h1 className="w-[25%] text-center">{user.picked}</h1>
      <h1 className="w-[25%] text-center">{user.delivered - user.picked}</h1>
    </div>
  );
}

export default HistoryCard
