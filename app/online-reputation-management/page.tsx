import styles from './page.module.scss'
import CTA from '@/components/CTA/CTA'
import Image from 'next/image'

import lessStressIcon from '@/public/icons/lessstress.svg'
import appointmentIcon from '@/public/icons/appointment.svg'
import timeIcon from '@/public/icons/Time.svg'
import increaseIcon from '@/public/icons/increase.svg'
import gearIcon from '@/public/icons/gear.svg'
import starIcon from '@/public/icons/Star.svg'
import Main from '@/components/Main/Main'
import Highlight from '@/components/Highlight/Highlight'
import LinkWrapper from '@/components/LinkWrapper/LinkWrapper'
import SmallCard, { Cards } from '@/components/SmallCard/SmallCard'

import importIcon from '@/public/icons/import.svg'
import emailIcon from '@/public/icons/email.svg'
import analyseIcon from '@/public/icons/analyse.svg'
import CaseStudies from '@/components/CaseStudies/CaseStudies'
import FullLine from '@/components/FullLine/FullLine'
export default function Page() {
    return (
        <Main noPaddingTop>
            <section className={styles.hero}>
                <section className={styles.details}>
                    <div className={styles.text}>
                        <h1>
                            <Highlight>Increase Revenue</Highlight> with More
                            5-Star Reviews
                        </h1>
                        <p>
                            Get <Highlight>48+ five-star reviews </Highlight> in{' '}
                            <i>under two weeks </i>
                            using our software.
                        </p>
                        <CTA />
                    </div>
                    <Image
                        src='/images/socialproof.png'
                        alt='Social Proof'
                        width={379 * 1.3}
                        height={63 * 1.3}
                        style={{
                            objectFit: 'contain'
                        }}
                    />
                </section>
                <picture>
                    {/* Add a photo when width is less than 1000px */}
                    <source
                        media='(max-width: 1000px)'
                        srcSet='/images/landing-2.webp'
                        type='image/webp'
                    />
                    <Image
                        src='/images/landing.webp'
                        alt='Illustration of more Google reviews'
                        width={871 * 0.5}
                        height={614 * 0.4}
                        className={styles.heroImage}
                    />
                </picture>
            </section>
            <section className={styles.stakes}>
                <h2>
                    Lack of Reviews is <Highlight>Costing You</Highlight> New
                    Customers
                </h2>
                <p>
                    <Highlight>
                        <LinkWrapper>
                            <a href='https://www.brightlocal.com/research/local-consumer-review-survey/'>
                                76% of consumers&nbsp;
                            </a>
                        </LinkWrapper>
                    </Highlight>
                    read reviews before making a decision. How many people
                    choose your competition because you{' '}
                    <Highlight>lack reviews?</Highlight> The truth is, lack of
                    reviews is already <Highlight>costing you</Highlight> a
                    great deal!
                </p>
                <b>We understand you.</b>
                <p>
                    That&apos;s why we offer to help you increase your reviews
                    to not only have a better reputation, but also rank better
                    on Google, and attract new customers.
                </p>
                <CTA />
            </section>
            <section className={styles.value}>
                <h3>
                    More Reviews,
                    <Highlight> More Customers</Highlight>, Less Stress
                </h3>
                <Cards>
                    <SmallCard
                        imgSrc={increaseIcon.src}
                        imgWidth={30}
                        imgAlt='More Customers'
                        title='More Customers'
                        description='You will get more 5-star reviews, resulting in better reputation, and increased revenue.'
                    />

                    <SmallCard
                        imgSrc={timeIcon.src}
                        imgAlt='Save Time'
                        imgWidth={30}
                        title='Save Time'
                        description='You will no longer need to ask customers for reviews. No more awkward conversations + save time!'
                    />

                    <SmallCard
                        imgSrc={lessStressIcon.src}
                        imgAlt='Less Stress'
                        title='Less Stress'
                        imgWidth={50}
                        description='You will no longer need to worry about your online reputation, The negative reviews will be buried'
                    />
                </Cards>
                <CTA />
            </section>
            <section className={styles.caseStudies}>
                <h4>Case Studies</h4>
                <CaseStudies />
            </section>
            <section className={styles.ourPlan}>
                <div className={styles.title}>
                    <h4>You Can Too Get More Reviews!</h4>
                </div>
                <Cards>
                    <SmallCard
                        imgSrc={appointmentIcon.src}
                        imgWidth={30}
                        imgAlt='Researching Your Situation'
                        title='Book a Call'
                        description='Pick a time slot that fits your schedule.'
                    />

                    <SmallCard
                        imgSrc={gearIcon.src}
                        imgWidth={30}
                        imgAlt='Set up'
                        title='Set up'
                        description='Upload your existing customer list, so you can get those 5-star review right away!'
                    />
                    <SmallCard
                        imgSrc={starIcon.src}
                        imgWidth={30}
                        imgAlt='Success'
                        title='Success'
                        description='You now have more 5-star reviews, and as a result get more customers, and your revenue has increased.'
                    />
                </Cards>
                <CTA />
            </section>
            <section className={styles.howWeDo}>
                <div className={styles.title}>
                    <h5>How Does It Work?</h5>
                    <p>
                        We&apos;ve built the most comprehensive reputation
                        management software, and yet it&apos;s the easiest to
                        use!
                    </p>
                </div>
                <Cards>
                    <SmallCard
                        imgSrc={importIcon.src}
                        imgWidth={30}
                        imgAlt='Import Icon'
                        title='Import Your Customer List'
                        description='You can import your customer list, or add them manually.'
                    />
                    <SmallCard
                        imgSrc={emailIcon.src}
                        imgWidth={30}
                        imgAlt='Send Out Review Requests'
                        title='Send Out Review Requests'
                        description='You can mass-send email/sms to all customers or one-by-one.'
                    />

                    <SmallCard
                        imgSrc={analyseIcon.src}
                        imgWidth={30}
                        imgAlt='Track Reviews'
                        title='Track Reviews'
                        description='You can track all reviews, and reply to them, while adding new clients.'
                    />
                </Cards>
                <CTA />
            </section>

            <section className={styles.explanatory}>
                <h6>
                    Achieve Top business Status: More Reviews, Trust, and
                    customer
                </h6>
                <div className={styles.text}>
                    <p>
                        At Review Surplus, we know you want to dominate your
                        local market. In order to achieve this, you need to
                        establish trust with your customers through more 5-star
                        reviews. The problem is, reviews don&apos;t write
                        themselves, which makes you feel powerless and concerned
                        about your online reputation.
                    </p>
                    <p>
                        With the amazing service you offer, we believe you
                        deserve far more appreciation and customers than you
                        currently have. We understand the frustration that comes
                        with knowing you provide top-notch service yet struggle
                        to have this reflected in your online presence. It can
                        feel like an uphill battle trying to encourage satisfied
                        customers to share their positive experiences.
                    </p>
                    <p>
                        That&apos;s why we want to help you improve your online
                        reputation with more 5-star reviews. Here&apos;s how it
                        works:
                    </p>
                    <ol>
                        <li>
                            You book a call, where we discuss your unique
                            challenges, and whether this software is the right
                            fit for your business
                        </li>
                        <li>
                            We will set it up so you can start collecting those
                            5-star review right away!
                        </li>
                        <li>
                            You now more more customers thanks to the new 5-star
                            reviews you have received
                        </li>
                    </ol>
                    <p>
                        So book a call now, so you no longer miss out on new
                        customers because of insufficient reviews, and start
                        attracting new customers and dominate your local area!
                    </p>
                </div>

                <CTA />
            </section>
            <FullLine />
            <section className={styles.faq}>
                <h6>Frequently Asked Questions (FAQ)</h6>
                <dl>
                    <dt>
                        <b>What are online reputation management software?</b>
                    </dt>
                    <dd>
                        Reputation management software helps business owners
                        manage their online reputation while collecting 5-star
                        reviews. Our software helps business owners increase
                        their reviews quickly and effortlessly.
                    </dd>
                    <dt>
                        <b>How long does reputation management take?</b>
                    </dt>
                    <dd>
                        With our reputation management software, you can expect
                        to see results immediately. You can even upload your
                        customer list to get a head start!
                    </dd>
                    <dt>
                        <b>How do I get more reviews for my business?</b>
                    </dt>
                    <dd>
                        You can get more reviews for your practice by asking
                        your customers for reviews. Review Surplus helps you
                        simplify this approach while collecting only 5-star
                        reviews.
                    </dd>
                    <dt>
                        <b>How does reputation management work?</b>
                    </dt>
                    <dd>
                        Review Surplus helps you send out SMS and email to your
                        customers. This process is super easy and requires
                        minimal effort on your end.
                    </dd>
                </dl>
            </section>
        </Main>
    )
}
