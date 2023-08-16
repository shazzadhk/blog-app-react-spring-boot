import '../App.css';
import {Menu} from "antd";
import React, {useState} from "react";
import {HomeFilled} from "@ant-design/icons";
import {NavLink} from "react-router-dom";

const items = [
    {
        label: <NavLink to="/"><HomeFilled/></NavLink>,
        key: 'home',
        // icon: <MailOutlined />,
    },
    {
        label: 'Men Fashion',
        key: 'men',
        children: [
            {
                label: "Men's Dresses",
                key: "mens-shirts",
            },
            {
                label: "Men's Shoes",
                key: "mens-shoes",
            },
            {
                label: "Men's Watches",
                key: "mens-watches",
            },

        ]
    },
    {
        label: 'Women Fashion',
        key: 'women',
        children: [
            {
                label: "Women's Shirts",
                key: "women-shirts",
            },
            {
                label: "Women's Shoes",
                key: "women-shoes",
            },
            {
                label: "Women's Watches",
                key: "women-watches",
            },
            {
                label: "Women's Bags",
                key: "women-bags",
            },
            {
                label: "Women's Jewellery",
                key: "women-jewellery",
            }
        ]
    },
    {
        label: 'Fragrances',
        key: 'fragrance',
    },
];
const Navbar = () => {

    const [current, setCurrent] = useState('home');
    const onClick = (e) => {
        setCurrent(e.key);
    };

    return(
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    )
}
export default Navbar;