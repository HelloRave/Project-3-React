import { Player } from '@lottiefiles/react-lottie-player';
import img from '../assets/37153-basic-spinner.json'

export default function Loading() {
    return (
        <div className='m-auto d-flex align-items-center justify-content-center h-100'>
            <Player 
            src={img}
            autoplay={true}
            loop
            speed={1}/>
        </div>
    )
}