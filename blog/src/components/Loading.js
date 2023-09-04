import React from 'react';
import { Spinner, Button } from 'react-bootstrap';

const Loading = ({ text, show }) => {

    return (
        show &&
        <div className='d-flex justify-content-center align-items-center'>
            <Button size="sm" disabled variant="primary">
                <Spinner
                    className="mr-2"
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                {text}
            </Button>
        </div>
    );
};

export default Loading;