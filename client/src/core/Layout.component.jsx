import React from 'react';
import Menu from './Menu.component';
import '../styles.css';
import {Link} from 'react-router-dom';

const Layout = ({ title = 'Title', description = 'Description', className, children }) => {
    return (
        <div>
            <Menu />
            <div className="text-center jumbotron">
                <h2 className='display-1'>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>
                {children}
            </div>
            <footer className="page-footer text-center font-small mt-4 wow fadeIn">
            <div className="footer-copyright py-3">
                <Link className="lead nav-link text-dark" to='/'><b>&copy; 2020 GetItNow</b></Link>
            </div>
        </footer>
        </div>
    );
};

export default Layout;