import Main from '@/components/Main/Main'
import styles from './page.module.scss'
import Highlight from '@/components/Highlight/Highlight'
import CTA from '@/components/CTA/CTA'
import FullLine from '@/components/FullLine/FullLine'
import SmallCard, { Cards } from '@/components/SmallCard/SmallCard'

import { SmallRows } from '@/components/Flex/Flex'
import noTrust from '@/public/icons/no-trust.svg'

import calendarIcon from '@/public/icons/calendar.svg'
import researchIcon from '@/public/icons/research.svg'
import trendDown from '@/public/icons/trend-down.svg'
import warning from '@/public/icons/warning.svg'
import starIcon from '@/public/icons/Star.svg'
import searchIcon from '@/public/icons/search.svg'
import trendUp from '@/public/icons/trend-up.svg'

import calendarIconWhite from '@/public/icons/white-calendar.svg'
import researchIconWhite from '@/public/icons/white-research.svg'
import trendDownWhite from '@/public/icons/white-trend-down.svg'
import warningWhite from '@/public/icons/white-warning.svg'
import starIconWhite from '@/public/icons/white-star.svg'
import searchIconWhite from '@/public/icons/white-search.svg'
import trendUpWhite from '@/public/icons/white-trend-up.svg'

export default function Page() {
    return (
        <Main>
            <section className={styles.hero}>
                <picture>
                    <source
                        srcSet='/images/white-robert-greene.webp'
                        media='(prefers-color-scheme: dark)'
                    />
                    <img
                        src='/images/Robert Greene.webp'
                        alt='Robert Greene'
                        width='400'
                    />
                </picture>
                <SmallRows>
                    <h1>
                        <Highlight>More Sales</Highlight> with Increased Reviews
                    </h1>
                </SmallRows>
                <p className={styles.txt}>
                    Get <strong>21+ five-star reviews</strong> in under{' '}
                    <strong>19 days</strong> using our software.
                </p>
                <CTA labelEnabled />
            </section>
            <FullLine />

            <section className={styles.stakes}>
                <h2>Lack of Reviews is Costing You New Customers...</h2>
                <p className={styles.description}>
                    What good is traffic if there is no social proof to back up
                    the quality of your services?
                </p>
                <Cards>
                    <SmallCard
                        darkThemeSrc={trendDownWhite.src}
                        imgSrc={noTrust.src}
                        imgWidth={50}
                        imgAlt='Lost Trust Icon'
                        title='Lost Trust'
                        description='A lack of reviews makes potential customers doubt the quality of your services or products.'
                    />
                    <SmallCard
                        darkThemeSrc={trendDownWhite.src}
                        imgSrc={trendDown.src}
                        imgWidth={50}
                        imgAlt='Trend Down Icon'
                        title='Lost Revenue'
                        description='Bad reviews can directly impact sales and reduce your revenue.'
                    />

                    <SmallCard
                        darkThemeSrc={trendDownWhite.src}
                        imgSrc={warning.src}
                        imgWidth={50}
                        imgAlt='Warning Icon'
                        title='Bad First Impression'
                        description='Without enough positive reviews, new customers may get a negative first impression that is hard to change.'
                    />
                </Cards>
            </section>

            <section className={styles.valueProposition} id='how'>
                <h3>More 5-Star Reviews Solves Your Problem</h3>
                <Cards>
                    <SmallCard
                        darkThemeSrc={starIconWhite.src}
                        imgSrc={starIcon.src}
                        imgWidth={50}
                        imgAlt='Star Icon'
                        title='Better Trust & Reputation'
                        description='More five-star reviews build trust with new customers and strengthen your reputation.'
                    />
                    <SmallCard
                        darkThemeSrc={trendUpWhite.src}
                        imgSrc={trendUp.src}
                        imgWidth={50}
                        imgAlt='Trend Up Icon'
                        title='More Customers'
                        description='Positive reviews can directly increase sales by convincing hesitant buyers to make a purchase.'
                    />
                    <SmallCard
                        darkThemeSrc={searchIconWhite.src}
                        imgSrc={searchIcon.src}
                        imgWidth={50}
                        imgAlt='Search Icon'
                        title='Higher Ranking'
                        description='As a result of more reviews, your business will rank higher on Google.'
                    />
                </Cards>
                <CTA />
            </section>

            <section className={styles.socialProof} id='work'>
                <h4>Our Reputation Management Software WORKS</h4>
                <figure className={styles.result}>
                    <img
                        src='/images/ORM-1.webp'
                        alt='NurDent Dental Practice'
                        width={400}
                        loading='lazy'
                    />
                    <figcaption>
                        <b>NurDent Dental Practice</b>
                        <p>
                            NurDent Dental Center increased its rating from 3.8
                            to 4.1 stars on Google My Business and received 21
                            new reviews, all in under 30 days!
                        </p>
                        <CTA
                            style={{
                                transform: 'rotate(var(--rotate))'
                            }}
                        />
                    </figcaption>
                </figure>
            </section>

            <section className={styles.process}>
                <h5>Simple Set Up</h5>
                <p className={styles.description}>
                    You can start uploading your customer list and receive
                    reviews right away in three simple steps.
                </p>
                <Cards>
                    <SmallCard
                        darkThemeSrc={calendarIconWhite.src}
                        imgWidth={50}
                        imgSrc={calendarIcon.src}
                        imgAlt='Calendar Icon'
                        title='Book a Call'
                        description='Choose a time slot that fits your schedule'
                    />
                    <SmallCard
                        darkThemeSrc={researchIconWhite.src}
                        imgWidth={50}
                        imgSrc={researchIcon.src}
                        imgAlt='Set Up Icon'
                        title='Set Up'
                        description='We will set up the software & upload your customer list.'
                    />
                    <SmallCard
                        darkThemeSrc={starIconWhite.src}
                        imgWidth={50}
                        imgSrc={starIcon.src}
                        imgAlt='Star Icon'
                        title='More Reviews & Sales'
                        description='You now get more reviews, resulting in more sales!'
                    />
                </Cards>
                <CTA />
            </section>

            <section className={styles.faq} id='faq'>
                <h6>FAQ (Frequently Asked Questions)</h6>

                <details>
                    <summary>What is Online Reputation Management?</summary>
                    <p>
                        Online Reputation Management is the practice of shaping
                        how people perceive your business online, e.g. Online
                        reviews.
                    </p>
                </details>

                <details>
                    <summary>How does the software work?</summary>
                    <p>
                        The software works by letting you add your customers or
                        upload a list, then send review requests via SMS and/or
                        email. It also protects you against negative reviews.
                    </p>
                </details>

                <details>
                    <summary>How much does it cost?</summary>
                    <p>
                        The cost depends on how many SMS messages you plan to
                        send. You can book a call to get a specific price.
                    </p>
                </details>

                <details>
                    <summary>Why are customer reviews important?</summary>
                    <p>
                        Customer reviews build trust and influence potential
                        buyers&apos; decisions.
                    </p>
                </details>

                <details>
                    <summary>Can I customize the review requests?</summary>
                    <p>
                        Yes, our software lets you design custom email templates
                        and create personalized SMS templates for review
                        requests.
                    </p>
                </details>
                <details>
                    <summary>What platforms does the software support?</summary>
                    <p>
                        The software supports popular review platforms like
                        Google, Yelp, Trustpilot, and Facebook.
                    </p>
                </details>
                <details>
                    <summary>How soon will I see results?</summary>
                    <p>
                        Many businesses see improvements in their ratings and
                        reviews within 1-2 weeks.
                    </p>
                </details>

                <details>
                    <summary>Is there a free trial available?</summary>
                    <p>
                        We are no longer offering a free trial, the value of our
                        software is clear. It&apos;s a take or leave it offer!
                        (We suggest you take it!)
                    </p>
                </details>

                <details>
                    <summary>Can I track my progress?</summary>
                    <p>
                        Yes, the software tracks your progress, including open
                        rates, click rates, and review rates (how many reviews a
                        certain email or SMS template has generated).{' '}
                    </p>
                </details>
            </section>

            <section className={styles.lastCTA}>
                <h6>Stop Losing Customers</h6>

                <p className={styles.description}>
                    Let&apos;s get you a ton of 5-star reviews to bury those
                    negative reviews and get you more sales.
                </p>

                <CTA labelEnabled />
            </section>
        </Main>
    )
}
