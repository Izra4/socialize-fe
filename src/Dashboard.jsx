import Header from "./component/header.jsx";
import Navbar from "./component/navbar.jsx";
import profil from "./assets/background.png";
import Post from "./component/post.jsx";

export const Dashboard = () => {
    return (
        <>
            <div className="w-full flex flex-col min-h-screen font-montserrat">
                <Header />
                <div className="flex flex-row">
                    <Navbar />
                    <div className="w-full mt-20 pl-10 pt-10 ml-64">
                        <Post
                            profile={profil}
                            username="Udin Petot"
                            time="25 menit yang lalu"
                            text="Halo guys, disini Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu nulla cursus, at bibendum urna consequat."
                            image={profil}
                            likes={296}
                            comments={211}
                        />
                        <Post
                            profile={profil}
                            username="Udin Petot"
                            time="25 menit yang lalu"
                            text="Halo guys, disini Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu nulla cursus, at bibendum urna consequat."
                            image={profil}
                            likes={296}
                            comments={211}
                        />
                        <Post
                            profile={profil}
                            username="Udin Petot"
                            time="25 menit yang lalu"
                            text="Halo guys, disini Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu nulla cursus, at bibendum urna consequat."
                            image={profil}
                            likes={296}
                            comments={211}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;