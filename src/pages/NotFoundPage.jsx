import {Link} from 'react-router'

export function NotFoundPage (){
    return (
        <div className="box">
            <h2>404 -Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to ="/">Return to Home</Link>
        </div>
    )
}