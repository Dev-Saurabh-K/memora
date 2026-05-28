import {Link} from "react-router-dom";

const Logo = ({classname})=>{

    return(
        <Link to="/dashboard">
        <div className={`text-[#10B981]  font-sans font-bold fixed top-4 -ml-5 ${classname}`}>
            m
        </div>
        </Link>
    )
}

export default Logo;