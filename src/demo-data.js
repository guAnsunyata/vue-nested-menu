
const data = {
    title: '首頁',
    children: [
        {
            title: `Today's Deals`,
            link: `/`,
            children: [],
        },
        {
            title: `Your Recommendations`,
            link: '/',
            children: [],
        },
        {
            title: `Shop By Department`,
            children: [
                {
                    title: `Amazon Music`,
                    children: [
                        {
                            title: `Amazon Music Unlimited`,
                            link: `/`,
                            children: [],
                        },
                        {
                            title: `Prime Music`,
                            link: `/`,
                            children: [],
                        },
                        {
                            title: `CDs and Vinyl`,
                            link: `/`,
                            children: [],
                        },
                    ],
                },
                {
                    title: `Prime Vedios`,
                    children: [
                        {
                            title: `All Vedio`,
                            link: '/',
                            children: [],
                        },
                        {
                            title: `Included with Prime`,
                            link: '/',
                            children: [],
                        },
                        {
                            title: `Rent or Buy`,
                            link: '/',
                            children: [],
                        },
                    ],
                },
                {
                    title: `Treasure Truck`,
                    link: '/',
                    children: [],
                },
                {
                    title: `Amazon Restaurants`,
                    children: [
                        {
                            title: `Thai`,
                            link: '/',
                            children: [],
                        },
                        {
                            title: `Chinese`,
                            link: '/',
                            children: [],
                        },
                        {
                            title: `American`,
                            link: '/',
                            children: [],
                        },
                        {
                            title: `Indian`,
                            link: '/',
                            children: [],
                        },
                        {
                            title: `Popular Restaurants`,
                            children: [
                                {
                                    title: `Popular Restaurants 1`,
                                    link: '/',
                                    children: [],
                                },
                                {
                                    title: `Popular Restaurants 2`,
                                    link: '/',
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

export default data;
