// import {Container, Row, Col} from 'react-bootstrap';

const BootstrapTest = (props) => {
    return (
        <div className="mt-5 mb-5">
            <div>
                <div className="left">
                    {props.left}
                </div>
                <div className="right">
                    {props.right}
                </div>
            </div>
        </div>
    )
}

export default BootstrapTest;