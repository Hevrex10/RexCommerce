import Button from '../component/Button'
import Navcard from '../component/Navcard'

export default function OrderCard({heading,subHeading,image,result,condition,buttonText,buttonTo,bg}:{heading:string,subHeading:string,image:string,result:string,condition:string,buttonText:string,buttonTo:string,bg:string}) {
  return (
    <>
     <Navcard text={heading} main={subHeading} bg={bg}/>
    <div className='flex items-center justify-center my-30'>
        <div className='flex flex-col gap-7 items-center'>
          <img src={image} alt="success box" />
            <p className="text-center text-gray-900 text-2xl font-bold font-['Inter']">{result}</p>
            <p className="max-w-96 w-full text-center  text-gray-600 text-sm font-normal font-['Inter'] leading-6">{condition}</p>
            <Button text={buttonText} to={buttonTo} />
        </div>
    </div>
    </>
  )
}
