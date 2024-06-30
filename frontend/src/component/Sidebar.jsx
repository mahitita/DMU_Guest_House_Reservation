import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebarList }) => {
    return (
        <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">Dashboard Menu</h2>
                <ul>
                    {sidebarList.map((item, index) => (
                        <li key={index} className="mb-2">
                            <Link
                                to={`/${item.replace(/\s+/g, '').toLowerCase()}`} // Example: "/viewrequests"
                                className="block px-4 py-2 rounded hover:bg-gray-700"
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
