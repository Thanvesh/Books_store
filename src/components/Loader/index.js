import { Vortex } from 'react-loader-spinner'
import "./index.css"


const Loader=()=>(
    <div className="spinner">
    <Vortex
visible={true}
height="80"
width="80"
ariaLabel="vortex-loading"
wrapperStyle={{}}
wrapperClass="vortex-wrapper"
colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
/> 
</div>
)

export default Loader