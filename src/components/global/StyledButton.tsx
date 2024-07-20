
type StyledButtonProps = {
  title: string,
  color?: string
  action?: () => void;
}

const StyledButton = ({ title, action }: StyledButtonProps) => {
  return (
    <button 
      onClick={action}
      className={`bg-[#B3679B] text-white text-base font-normal py-2 px-6 rounded-md border-0 hover:bg-[#9c5987] tracking-wide capitalize`}
    >
      { title }
    </button>
  )
}

export default StyledButton