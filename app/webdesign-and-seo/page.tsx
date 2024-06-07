import Main from '@/components/Main/Main'
import styles from './webDesignAndSeo.module.scss'
import Highlight from '@/components/Highlight/Highlight'
import Buttons from '@/components/Buttons/Buttons'
import CTA, { CaseStudyCTA } from '@/components/CTA/CTA'
import FullLine from '@/components/FullLine/FullLine'
import SmallCard, { Cards } from '@/components/SmallCard/SmallCard'
import rankIcon from '@/public/icons/rank.svg'
import flashIcon from '@/public/icons/Flash.svg'
import moneyBagIcon from '@/public/icons/moneybag.svg'
import CaseStudies from '@/components/CaseStudies/CaseStudies'

import calendarIcon from '@/public/icons/calendar.svg'
import analyseIcon from '@/public/icons/analyse.svg'
import LinkWrapper from '@/components/LinkWrapper/LinkWrapper'

export default function WebDesignAndSeo() {
    return (
        <Main noPaddingTop>
            <section className={styles.hero}>
                <h1>
                    <Highlight>Grow Revenue</Highlight> with a High-Traffic,
                    High-Conversion Website
                </h1>
                <p>
                    Ranking on Google is half the job, converting the traffic to
                    a paying customers is the other half. We do both.
                </p>
                <Buttons>
                    <CaseStudyCTA />
                    <CTA />
                </Buttons>
            </section>
            <FullLine />
            <section className={styles.stakes}>
                <h2>
                    Lack of a Professional Website is Costing you{' '}
                    <Highlight>$$$</Highlight>
                </h2>
                <p>
                    How many clients leave because your website is{' '}
                    <strong>slow</strong>? How many never find you due to{' '}
                    <strong>low Google ranking</strong>? How many never convert
                    because your website is not <strong>user-friendly</strong>?
                </p>

                <b>We understand you.</b>
                <p>
                    That&apos;s why we help business owners like you with
                    beautiful sales & speed optimized websites that bring
                    customers.
                </p>
                <Buttons>
                    <CaseStudyCTA />
                    <CTA />
                </Buttons>
            </section>

            <section className={styles.valueProposition}>
                <h3>
                    A Website That <Highlight>Ranks</Highlight> on Google and
                    Converts Traffic into Customers
                </h3>
                <Cards>
                    <SmallCard
                        imgSrc={rankIcon.src}
                        imgWidth={30}
                        imgAlt='Rank Icon'
                        title='Ranks on Google'
                        description="We will build a website that ranks high on Google so you don't miss out on the huge traffic."
                    />
                    <SmallCard
                        imgSrc={flashIcon.src}
                        imgWidth={30}
                        imgAlt='Rank Icon'
                        title='Fast & Beautiful'
                        description="You will get a website that is both fast & beautiful, ensuring that users don't get frustrated by load time."
                    />
                    <SmallCard
                        imgSrc={moneyBagIcon.src}
                        imgWidth={30}
                        imgAlt='Money Bag Icon'
                        title='Increased Conversion'
                        description='You get a website that converts more of the traffic into paying customers, resulting in increased revenue.'
                    />
                </Cards>
                <CTA />
            </section>

            <section className={styles.caseStudies}>
                <h4>Case Studies</h4>
                <CaseStudies />
            </section>

            <section className={styles.process}>
                <h5>
                    You Will Get <Highlight>Increased</Highlight> Revenue
                </h5>
                <Cards>
                    <SmallCard
                        imgSrc={calendarIcon.src}
                        imgAlt='Calendar Icon'
                        title='Book a Call'
                        description='Choose a time slot that fits your schedule'
                    />
                    <SmallCard
                        imgSrc={analyseIcon.src}
                        imgAlt='Analyse Icon'
                        title='Analyse Your Situation'
                        description='We will analyse your situation and decide whether you need a new website, a redesign or only some SEO work.'
                    />
                    <SmallCard
                        imgSrc={moneyBagIcon.src}
                        imgAlt='Moneybag Icon'
                        title='Increased Revenue'
                        description='You now have increased your revenue as a result of a website that gets traffic and converts traffic into sales.'
                    />
                </Cards>
            </section>

            <section className={styles.stakesTwo}>
                <h6>Low Speed = Low Conversion Rate</h6>
                <p>
                    <LinkWrapper>
                        <a
                            href='https://www.bidnamic.com/en-us/resources/how-website-speed-affects-your-conversion-rates'
                            target='_blank'
                            rel='noreferrer'
                        >
                            Studies suggest
                        </a>
                    </LinkWrapper>{' '}
                    that for every second the site{' '}
                    <Highlight>loads slower</Highlight>, the conversion rate{' '}
                    <Highlight>drops by 17%</Highlight>. How many customers have
                    you lost because of a slow website?
                </p>
                <p>
                    Take a Pagespeed test at Google&apos;s{' '}
                    <LinkWrapper>
                        <a
                            href='https://pagespeed.web.dev/'
                            target='_blank'
                            rel='noreferrer'
                        >
                            PageSpeed Insights
                        </a>
                    </LinkWrapper>{' '}
                    and find out for yourself.
                </p>

                <CTA />
            </section>

            <FullLine />
            <section className={styles.guideTwo}>
                <h6>We Make Fast-Loading Websites</h6>
                <p>
                    We recently got a score of 93 for the pagespeed of
                    <LinkWrapper>
                        <a
                            href='https://fotballbilletter.no'
                            target='_blank'
                            rel='noreferrer nofollow'
                        >
                            {' '}
                            Fotballbilletter.no
                        </a>
                    </LinkWrapper>
                </p>
                <p>
                    Don&apos;t take our word for it, test it at
                    <LinkWrapper>
                        <a
                            href='https://pagespeed.web.dev/'
                            target='_blank'
                            rel='noreferrer'
                        >
                            {' '}
                            PageSpeed Insights
                        </a>
                    </LinkWrapper>{' '}
                    and see for yourself.
                </p>
                <CTA />
            </section>
        </Main>
    )
}
