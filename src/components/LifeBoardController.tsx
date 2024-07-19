import React from 'react';
import StyledButton from './global/StyledButton';

type Props = {}

const LifeBoardController = (props: Props) => {

  return (
    <div className='w-full fixed bottom-0 flex flex-row items-center justify-center gap-8 bg-[#111111bd] py-3'>
      <StyledButton 
        title='Start'
        // action={}
      />
      <StyledButton 
        title='Stop'
        // action={}
      />
      <StyledButton 
        title='Create Random Start State'
        // action={start}
      />
    </div>
  )
}

export default LifeBoardController