import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState } from 'react';
import { useRouter } from 'next/router';

// export default function Navbar({
//     onBtnClick = () => { },
// }) {
//     let homeBgColor = "#272727";
//     const r = useRouter();
//     const goToHome = () => {
//         r.push("/");
//     }
//     const goToChat = () => {
//         r.push("/chat");
//     }
//     const goToHelp = () => {
//         r.push("/help");
//     }
//     const goToProfile = () => {
//         r.push("/profile");
//     }

//     const [homeState, setHomeState] = useState("inactive");

//     return (
//         <div className='flex justify-around bg-slate-500 py-3 text-white sticky'>

//             {/* Home */}
//             {
//                 homeState === "active" ? (
//                     <div className='flex flex-col items-center justify-center cursor-pointer' onClick={setHomeState("active")}>
//                         <HomeOutlinedIcon />
//                         Home
//                     </div>
//                 ) : (
//                     <div className='flex flex-col items-center justify-center cursor-pointer' onClick={setHomeState("inactive")}>
//                         <HomeIcon />
//                         Home
//                     </div>
//                 )
//             }

//             {/*Chat */}
//             <div className='flex flex-col items-center justify-center cursor-pointer' onClick={goToChat}>
//                 <MarkUnreadChatAltOutlinedIcon />
//                 Chat
//             </div>

//             {/* Help */}
//             <div className='flex flex-col items-center justify-center cursor-pointer' onClick={goToHelp}>
//                 <HelpOutlineIcon />
//                 Help
//             </div>

//             {/* Profile */}
//             <div className='flex flex-col items-center justify-center cursor-pointer' onClick={goToProfile}>
//                 <AccountCircleOutlinedIcon />
//                 Profile
//             </div>
//         </div>
//     )
// }

import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


export default class Navbar extends Component {
    state = { activeItem: 'home' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name }, console.log(`Clicked ${name}`));
    onBtnClick = () => { };

    render() {
        const { activeItem } = this.state
        // const r = useRouter();
        return (<div className='flex items-center justify-around'>
            <Menu secondary>
                <div className='flex flex-col items-center'>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                        icon='home'
                    />
                    {/* <FontAwesomeIcon icon="fa-light fa-house" /> */}
                </div>
                <Menu.Item
                    name='chat'
                    active={activeItem === 'chat'}
                    onClick={this.handleItemClick}
                    icon='chat'
                />
                <Menu.Item
                    name='help'
                    active={activeItem === 'help'}
                    onClick={this.handleItemClick}
                    icon='help'
                />
                <Menu.Item
                    name='profile'
                    active={activeItem === 'profile'}
                    onClick={this.handleItemClick}
                    icon='user'
                />
            </Menu>
        </div>
        )
    }
};


// export default function Navbar({
//     handleItemClick = (e, { name }) => this.setState({ activeItem: name }, console.log(`Clicked ${name}`)),
//     onBtnClick = () => { },
// }) {
//     const [activeItem, setActiveItem] = useState('home');
//     // state = { activeItem: 'home' }
//     return (<div className='flex items-center justify-around'>
//         <Menu secondary>
//             <div className='flex flex-col items-center'>
//                 <Menu.Item
//                     name='home'
//                     active={activeItem === 'home'}
//                     onClick={handleItemClick}
//                     icon='home'
//                 />
//             </div>
//             <Menu.Item
//                 name='chat'
//                 active={activeItem === 'chat'}
//                 onClick={handleItemClick}
//                 icon='chat'
//             />
//             <Menu.Item
//                 name='help'
//                 active={activeItem === 'help'}
//                 onClick={handleItemClick}
//                 icon='help'
//             />
//             <Menu.Item
//                 name='profile'
//                 active={activeItem === 'profile'}
//                 onClick={handleItemClick}
//                 icon='user'
//             />
//         </Menu>
//     </div>
//     )
// }