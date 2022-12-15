import {SideNavbar} from '../SideNavbar/SideNavbar'
import './MainBody.css';

function MainBody({children}){
    return(
        <div className='mainBody'>
            <SideNavbar />
            <div className='bodyContent'>
                {children}
            </div>
        </div>
    )
}

export default MainBody