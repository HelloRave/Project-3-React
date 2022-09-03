import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <Fragment>
            <div className="landingPage d-flex justify-content-center align-items-center">
                <div className="tagLine p-5">
                    <p className="h1 text-center">
                        Protein Is The <br/>
                        Building Blocks <br/>
                        For Life.
                    </p>
                    <div className="text-center mt-4">
                        <button className="theme-button">
                            <Link to='/products' className="text-decoration-none text-reset">
                                Shop Now
                            </Link>
                        </button>
                    </div>

                </div>
            </div>
            <div className="text-center py-2 footer">
                @hellorave For Education Purpose Only.
            </div>
        </Fragment>

    )
}