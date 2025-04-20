import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center absolute w-[93%] top-0 ' onClick={()=>{
                    props.waitingForDriver(false)
                }}>
                    <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
                </h5>
                <div className='flex items-center justify-between'>
                <img className='h-15' src="/images/Uber-car.png" alt="" />
                <div className=' text-right '>
                    <h2 className='text-lg font-medium'>Pratham</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'> MH26 CQ 2326</h4>
                    <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                    <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹193.20</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash cash</p>
                        </div>
                    </div>

                </div>
                </div>
    </div>
  )
}

export default WaitingForDriver