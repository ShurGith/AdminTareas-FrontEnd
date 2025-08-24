
type typeBadgesProps = {
  rolLabel: string;
};

function Badges( {rolLabel}: typeBadgesProps ) {
  const colorManager = "border-green-500 text-green-500 bg-green-50 "
  const colorColaborator  = "border-yellow-500 text-yellow-500 bg-yellow-50 "
  


  return (
    <span className={`${rolLabel === "Manager" ? colorManager : colorColaborator} border inline-flex items-center rounded-md px-2 py-1 text-xs font-medium`}>
      {rolLabel}
    </span>
  )
}

export default Badges