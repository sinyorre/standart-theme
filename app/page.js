async function getWebsiteData() {
    const res = await fetch(`http://hekimrandevum-env.eba-md56hm3n.eu-central-1.elasticbeanstalk.com/users/${process.env.USER_ID}/websites`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Home() {
    const data = await getWebsiteData();
    const {mainCard, incentivesCard} = data;
    const {image, title, description} = mainCard;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="w-full flex flex-col p-10 gap-5 md:w-10/12">
                {/*MainCard*/}
                <div className="flex w-full justify-center items-center content-center">
                    <div
                        className="flex flex-col justify-center items-center content-center bg-white border border-gray-200 rounded-lg shadow-xl w-full md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-8"
                    >
                        <div className="flex flex-col md:flex-row md:w-3/4 w-full">
                            <div className="w-full md:w-3/12 px-4">
                                <img src={image} alt=""
                                     className="object-cover rounded-full max-w-full h-auto align-middle border-none"/>
                            </div>
                            <div
                                className="flex flex-col p-4 leading-normal justify-center content-center items-center w-full">
                                <div className="w-full md:w-10/12">
                                    <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                                        {title}
                                    </h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-base text-center">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*IncentivesCard*/}
                <div className="flex flex-col w-full md:flex-row gap-2">
                    {incentivesCard.map(card => (
                        <div
                            className="flex flex-col justify-center content-center items-center gap-4 w-full md:w-1/3 bg-white text-center p-5 rounded-lg">
                            <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:text-white">{card.title ? card.title : ''}</h2>
                            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{card.description ? card.description : ''}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
