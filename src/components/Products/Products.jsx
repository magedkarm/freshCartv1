import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Await } from 'react-router-dom';

export default function Products() {

    return (
        <>
            <Helmet>
                <title>Products</title>
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h1>maskmf</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
