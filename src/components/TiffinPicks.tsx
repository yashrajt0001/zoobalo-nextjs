import React from 'react'
import TiffinItem from './TiffinItem'

const TiffinPicks = () => {
    return (
        <div className='flex py-16 items-center bg-[#ffded3] overflow-x-auto'>
            <div className='gap-3 mx-12'>
                <div className='text-[#ff5800] font-bold text-lg tracking-[2px] font-sans'>POPULAR</div>
                <h2 className='font-sans font-bold text-[2.5rem] w-[350px]'>Top-Rated Tiffin Picks</h2>
            </div>
            <div className='flex gap-10'>
                <TiffinItem title='Dal Bati' price='60' />
                <TiffinItem title='Dal Bati' price='60' />
                <TiffinItem title='Dal Bati' price='60' />
                <TiffinItem title='Dal Bati' price='60' />
            </div>
        </div>
    )
}

export default TiffinPicks