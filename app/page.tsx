import CTA, { CaseStudyCTA, LearnMoreCTA } from '@/components/CTA/CTA'
import styles from './page.module.scss'
import websiteIcon from '@/public/icons/website.svg'
import starIcon from '@/public/icons/Star.svg'
import moneybagIcon from '@/public/icons/moneybag.svg'
import calendarIcon from '@/public/icons/calendar.svg'
import analyseIcon from '@/public/icons/analyse.svg'
import draftIcon from '@/public/icons/draft.svg'
import Buttons from '@/components/Buttons/Buttons'
import Image from 'next/image'
import CaseStudies from '@/components/CaseStudies/CaseStudies'
import Main from '@/components/Main/Main'
import Highlight from '@/components/Highlight/Highlight'
import FullLine from '@/components/FullLine/FullLine'
import SmallCard from '@/components/SmallCard/SmallCard'
import { Cards } from '@/components/SmallCard/SmallCard'

export default function Page() {
    return (
        <Main noPaddingTop>
            <section className={styles.hero}>
                <h1>
                    <Highlight>Increase Revenue</Highlight> with Sales Optimized
                    Websites & More 5-Star Reviews
                </h1>
                <p>
                    We will get you a{' '}
                    <Highlight>sales & SEO optimized website</Highlight> and{' '}
                    <Highlight>50+ five-star reviews</Highlight> in under 10
                    days
                </p>
                <Buttons>
                    <CaseStudyCTA />
                    <CTA />
                </Buttons>
            </section>
            <FullLine />

            <section className={styles.stakes}>
                <h2>Inefficient Marketing is Like a Hole in Your Pocket</h2>
                <div className={styles.cards}>
                    <figure className={styles.valueCard}>
                        <img
                            src={websiteIcon.src}
                            alt='Website Icon'
                            width={30}
                            height={30}
                        />
                        <figcaption>
                            <b className={styles.title}>Web Design & SEO</b>
                            <p>
                                How many clients leave your website for your
                                competition because it takes{' '}
                                <strong>forever to load</strong>? How many
                                clients never find your website because it{' '}
                                <strong>doesn&apos;t rank on Google</strong>?
                            </p>
                            <b>We understand you.</b>
                            <p>
                                That&apos;s why we help business owners like you
                                with sales optimized, speed optimized and
                                beautiful websites.
                            </p>
                            <Buttons
                                style={{
                                    justifyContent: 'start'
                                }}
                            >
                                <CaseStudyCTA />
                                <CTA />
                            </Buttons>
                        </figcaption>
                    </figure>
                    <figure className={styles.valueCard}>
                        <img
                            src={starIcon.src}
                            alt='Website Icon'
                            width={30}
                            height={30}
                        />
                        <figcaption>
                            <b className={styles.title}>
                                Reputation Management
                            </b>
                            <p>
                                How often do you worry about brands online
                                reputation? How many times have you received a{' '}
                                <strong>1-star review</strong> unfairly? How
                                many clients choose your{' '}
                                <strong>competitor</strong> because they have a
                                better rating?
                            </p>
                            <b>We know how you feel</b>
                            <p>
                                That&apos;s why we built an online reputation
                                management software to help businesses like
                                yours get more 5-star reviews and bury those
                                negative reviews.
                            </p>
                            <Buttons
                                style={{
                                    justifyContent: 'start'
                                }}
                            >
                                <LearnMoreCTA href='/online-reputation-management' />
                                <CTA />
                            </Buttons>
                        </figcaption>
                    </figure>
                </div>
            </section>
            <section className={styles.valueProposition}>
                <h3>
                    A Website That <Highlight>Sells</Highlight> & More{' '}
                    <Highlight>5-Star Reviews</Highlight>
                </h3>

                <Cards>
                    <SmallCard
                        imgSrc={websiteIcon.src}
                        imgAlt='Website Icon'
                        imgWidth={30}
                        title='Website That Sells'
                        description='You will get a website that ranks on Google, and converts the traffic to paying clients'
                    />

                    <SmallCard
                        imgSrc={starIcon.src}
                        imgAlt='Star Icon'
                        imgWidth={30}
                        title='More 5-star reviews'
                        description='You will get more 5-star reviews. As a result, clients trust you more, and you rank higher on Google.'
                    />

                    <SmallCard
                        imgSrc={moneybagIcon.src}
                        imgAlt='Moneybag Icon'
                        imgWidth={30}
                        title='Increased Revenue'
                        description='You now have an increased revenue as a result of the higher ranking on Google and increased trust.'
                    />
                </Cards>
                <CTA />
            </section>

            <div className={styles.caseStudies}>
                <h4>Projects</h4>
                <CaseStudies />
            </div>

            <section className={styles.process}>
                <h5>Increase Revenue Simply</h5>
                <Cards>
                    <SmallCard
                        imgSrc={calendarIcon.src}
                        imgAlt='Calendar Icon'
                        imgWidth={30}
                        title='Book a Call'
                        description='Choose a time slot that fits your schedule'
                    />
                    <SmallCard
                        imgSrc={analyseIcon.src}
                        imgAlt='Analyse Icon'
                        imgWidth={30}
                        title='Analyse Your Situation'
                        description='We will analyse your situation and decide whether you need a new website, a redesign or more Google reviews.'
                    />

                    <SmallCard
                        imgSrc={draftIcon.src}
                        imgAlt='Pen Icon'
                        imgWidth={30}
                        title='First Draft Within Days'
                        description='We will deliver the first draft of your website within days. For the software, we will set it up immediately.'
                    />
                </Cards>
                <CTA />
            </section>

            <section className={styles.reviewSurplus}>
                <div className={styles.column}>
                    <h6>
                        ReviewSurplus™ Online Reputation Management Software
                    </h6>
                    <div className={styles.card}>
                        <p>
                            We have built the most comprehensive reputation
                            management software, and yet it&apos;s the easiest
                            to use!
                        </p>
                        <p>Does your business need more reviews?</p>

                        <Buttons
                            style={{
                                justifyContent: 'start'
                            }}
                        >
                            <LearnMoreCTA href='/online-reputation-management' />
                            <CTA />
                        </Buttons>
                    </div>
                </div>

                <div className={styles.column}>
                    <Image
                        src='/images/landing.webp'
                        alt='ReviewSurplus™ Online Reputation Management Software'
                        width={800}
                        height={500}
                        layout='responsive'
                        sizes='(max-width: 900px) 100vw, 50vw'
                        loading='lazy'
                    />
                </div>
            </section>
        </Main>
    )
}
