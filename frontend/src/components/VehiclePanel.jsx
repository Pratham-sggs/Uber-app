import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center absolute w-[93%] top-0 ' onClick={()=>{
                    props.setVehiclePanel(false)
                }}>
                    <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
                </h5>
                <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>


                <div onClick={
                    () => {
                        props.setConfirmRidePanel(true)
                    }
                } className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between '>
                    <img className='h-12' src="/images/Uber-car.png" alt="" />
                    <div className=' w-1/2'>
                        <h4 className='font-medium text-base'>
                            UberGo <span>
                                <i className='ri-user-3-fill'>4</i>
                            </span>
                        </h4>
                        <h5 className='font-medium text-sm'>
                            2 mins away
                        </h5>
                        <p className='font-normal text-xs text-gray-600'>
                            Affordable,compact rides
                        </p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹192.23</h2>
                </div>
                <div onClick={
                    () => {
                        props.setConfirmRidePanel(true)
                    }
                } className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between '>
                    <img className='h-12' src="/images/Uber-moto.png" alt="" />
                    <div className=' w-1/2'>
                        <h4 className='font-medium text-base'>
                            Moto <span>
                                <i className='ri-user-3-fill'>1</i>
                            </span>
                        </h4>
                        <h5 className='font-medium text-sm'>
                            3 mins away
                        </h5>
                        <p className='font-normal text-xs text-gray-600'>
                            Affordable,Moter rides
                        </p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹65.23</h2>
                </div>
                <div onClick={
                    () => {
                        props.setConfirmRidePanel(true)
                    }
                } className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between '>
                    <img className='h-12' src="/images/Auto.png" alt="" />
                    <div className=' w-1/2'>
                        <h4 className='font-medium text-base'>
                            UberAuto <span>
                                <i className='ri-user-3-fill'>4</i>
                            </span>
                        </h4>
                        <h5 className='font-medium text-sm'>
                            2 mins away
                        </h5>
                        <p className='font-normal text-xs text-gray-600'>
                            Affordable,Auto rides
                        </p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹112.23</h2>
                </div>
    </div>
  )
}

export default VehiclePanel