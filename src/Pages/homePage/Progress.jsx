
export default function Progress() {
    return (
          <div className='mt-4'>
    <div className='flex justify-between text-sm mb-2'>
        <p>Progress</p>
        <p className='text-gray-400'>60%</p>
    </div>

    <div className='w-full bg-gray-700 rounded-full h-2'>
        <div
            className='bg-[#245f3b] h-2 rounded-full'
            style={{ width: '60%' }}
        ></div>
    </div>
</div>
    )
}