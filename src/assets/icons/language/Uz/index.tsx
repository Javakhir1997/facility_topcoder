const Index = () => {
    return (
        <svg
            style={{maxWidth: "1.5rem", minWidth: "1.5rem", width: "100%", height: "auto"}}
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            id="flag-icons-uz"
        >
            <path d="M0 320h640v160H0z" fill="#1eb53a"/>
            <path d="M0 0h640v160H0z" fill="#0099b5"/>
            <path d="M0 153.6h640v172.8H0z" fill="#ce1126"/>
            <path d="M0 163.2h640v153.6H0z" fill="#fff"/>
            <circle fill="#fff" cx="134.4" cy="76.8" r="57.6"/>
            <circle fill="#0099b5" cx="153.6" cy="76.8" r="57.6"/>
            <g fill="#fff" transform="translate(261.1 122.9)scale(1.92)">
                <g id="uz-e">
                    <g id="uz-d">
                        <g id="uz-c">
                            <g id="uz-b">
                                <path d="M0-6-1.9-.3 1 .7" id="uz-a"/>
                                <use transform="scale(-1 1)" xlinkHref="#uz-a" height="100%" width="100%"/>
                            </g>
                            <use transform="rotate(72)" xlinkHref="#uz-b" height="100%" width="100%"/>
                        </g>
                        <use xlinkHref="#uz-b" width="100%" height="100%" transform="rotate(-72)"/>
                        <use xlinkHref="#uz-c" width="100%" height="100%" transform="rotate(144)"/>
                    </g>
                    <use xlinkHref="#uz-d" width="100%" height="100%" y="-24"/>
                    <use xlinkHref="#uz-d" width="100%" height="100%" y="-48"/>
                </g>
                <use xlinkHref="#uz-e" width="100%" height="100%" x="24"/>
                <use xlinkHref="#uz-e" width="100%" height="100%" x="48"/>
                <use xlinkHref="#uz-d" width="100%" height="100%" x="-48"/>
                <use xlinkHref="#uz-d" width="100%" height="100%" x="-24"/>
                <use xlinkHref="#uz-d" width="100%" height="100%" x="-24" y="-24"/>
            </g>
        </svg>
    )
}

export default Index;