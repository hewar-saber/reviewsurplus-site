import CTA, { CaseStudyCTA, LearnMoreCTA } from '@/components/CTA/CTA'
import styles from './page.module.scss'
import websiteIcon from '@/public/icons/website.svg'
import starIcon from '@/public/icons/Star.svg'
import moneybagIcon from '@/public/icons/moneybag.svg'
import { WithArrow } from '@/components/Buttons/Buttons'
import calendarIcon from '@/public/icons/calendar.svg'
import analyseIcon from '@/public/icons/analyse.svg'
import Buttons from '@/components/Buttons/Buttons'
import Image from 'next/image'
import CaseStudies from '@/components/CaseStudies/CaseStudies'

export default function Page() {
    return (
        <main className={styles.home}>
            <section className={styles.hero}>
                <h1>
                    <span>Increase Revenue</span> with Sales Optimized Websites
                    & More 5-Star Reviews
                </h1>
                <p>
                    We will get you a <span>sales & SEO optimized website</span>{' '}
                    and <span>50+ five-star reviews</span> in under 10 days
                </p>
                <div className={styles.buttons}>
                    <CaseStudyCTA />
                    <CTA />
                </div>
            </section>
            <hr className={styles.fullLine} />

            <section className={styles.stakes}>
                <h2>Insufficient Marketing is Like a Hole in Your Pocket</h2>
                <div className={styles.cards}>
                    <figure className={styles.valueCard}>
                        <img
                            src={websiteIcon.src}
                            alt='Website Icon'
                            width={40}
                            height={40}
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
                            <div className={styles.buttons}>
                                <CaseStudyCTA />
                                <CTA />
                            </div>
                        </figcaption>
                    </figure>
                    <figure className={styles.valueCard}>
                        <img
                            src={starIcon.src}
                            alt='Website Icon'
                            width={40}
                            height={40}
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
                            <div className={styles.buttons}>
                                <LearnMoreCTA href='/reputation-management' />
                                <CTA />
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </section>
            <section className={styles.valueProposition}>
                <h3>
                    A Website That <span>Sells</span> & More{' '}
                    <span>5-Star Reviews</span>
                </h3>

                <div className={styles.cards}>
                    <figure>
                        <img
                            src={websiteIcon.src}
                            alt='Website Icon'
                            width={40}
                            height={40}
                        />
                        <figcaption>
                            <b className={styles.title}>Website That Sells</b>
                            <p>
                                You will get a website that ranks on Google, and
                                converts the traffic to paying clients
                            </p>
                        </figcaption>
                    </figure>
                    <figure>
                        <img
                            src={starIcon.src}
                            alt='Star icon'
                            width={40}
                            height={40}
                        />
                        <figcaption>
                            <b className={styles.title}>More 5-star reviews</b>
                            <p>
                                You will get more 5-star reviews. As a result,
                                clients trust you more, and you rank higher on
                                Google.
                            </p>
                        </figcaption>
                    </figure>
                    <figure>
                        <img
                            src={moneybagIcon.src}
                            alt='Moneybag icon'
                            width={40}
                            height={40}
                        />
                        <figcaption>
                            <b className={styles.title}>Increased Revenue</b>
                            <p>
                                You now have an increased revenue as a result of
                                the higher ranking on Google and increased
                                trust.
                            </p>
                        </figcaption>
                    </figure>
                </div>
                <CTA />
            </section>

            <div className={styles.caseStudies}>
                <h4>Case Studies</h4>
                <CaseStudies />
            </div>

            <section className={styles.process}>
                <h5>Increase Revenue Simply</h5>
                <div className={styles.cards}>
                    <figure>
                        <img
                            src={calendarIcon.src}
                            alt='Calendar icon'
                            width={40}
                            height={40}
                        />
                        <figcaption>
                            <b>Book a Call</b>
                            <p>Choose a time slot that fits your schedule</p>
                        </figcaption>
                    </figure>
                    <figure>
                        <img
                            src={analyseIcon.src}
                            alt='Analyse icon'
                            width={40}
                            height={40}
                        />
                        <figcaption>
                            <b>Analyse Your Situation</b>
                            <p>
                                We will analyse your situation and decide
                                whether you need a new website, a redesign or
                                more Google reviews.
                            </p>
                        </figcaption>
                    </figure>

                    <figure>
                        <img
                            src={moneybagIcon.src}
                            alt='Moneybag icon'
                            width={40}
                            height={40}
                        />
                        <figcaption>
                            <b>Increased Revenue</b>
                            <p>
                                You now have an increased revenue as a result of
                                the higher ranking on Google and increased
                                trust.
                            </p>
                        </figcaption>
                    </figure>
                </div>
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

                        <Buttons>
                            <LearnMoreCTA href='/reputation-management' />
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
        </main>
    )
}
