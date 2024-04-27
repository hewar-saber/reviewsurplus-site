'use client'
import Calendar from '@/components/Calender/Calendar'
import styles from './page.module.css'
import { useNotification } from '@/hooks/notification/useNotification'
import CTA from '@/components/CTA/CTA'
import { Card, Cards } from '@/components/Card/Card'
import Image from 'next/image'

import lessStressIcon from '@/public/icons/lessstress.svg'
import appointmentIcon from '@/public/icons/appointment.svg'
import timeIcon from '@/public/icons/Time.svg'
import increaseIcon from '@/public/icons/increase.svg'
// import brushIcon from '@/public/icons/brush.svg'
import gearIcon from '@/public/icons/gear.svg'
import starIcon from '@/public/icons/Star.svg'

export default function Page() {
    const { fireNotification, notificationContextHolder } = useNotification()
    return (
        <main className={styles.landing}>
            <section className={styles.hero}>
                <section className={styles.details}>
                    <div className={styles.text}>
                        <h1>Increase Revenue with More 5-Star Reviews</h1>
                        <p>
                            Our software lets you easily collect more 5-star
                            reviews and increase your revenue. Book a call to
                            secure your 5-star reviews today.
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
                {/* <Calendar
                    fireNotification={fireNotification}
                    description='Fill out the form to book a call with our team. We will disucss whether this software is a good fit for your business.'
                /> */}
            </section>
            <section className={styles.value}>
                <h3>More Reviews, More Customers, Less Stress</h3>
                <div className={styles.cards}>
                    <figure>
                        <Image
                            src={increaseIcon.src}
                            alt='value'
                            width={30}
                            height={30}
                        />
                        <b>More Customers</b>
                        <figcaption>
                            You will get more 5-star reviews, resulting in
                            better reputation, and increased revenue.
                        </figcaption>
                    </figure>
                    <figure>
                        <Image
                            src={timeIcon.src}
                            alt='value'
                            width={30}
                            height={30}
                        />
                        <b>Save Time</b>
                        <figcaption>
                            You will no longer need to ask customers for
                            reviews. No more awkward conversations + save time!
                        </figcaption>
                    </figure>
                    <figure>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={lessStressIcon.src}
                            alt='value'
                            height={30}
                            style={{
                                alignSelf: 'start'
                            }}
                        />
                        <b>Less stress</b>
                        <figcaption>
                            You will no longer need to worry about your online
                            reputation, we&apos;ve got you covered.
                        </figcaption>
                    </figure>
                </div>
                <CTA />
            </section>
            <section className={styles.stakes}>
                <h2>Lack of Reviews is Costing You New Customers</h2>
                <p>
                    <a href='https://www.brightlocal.com/research/local-consumer-review-survey/'>
                        76% of consumers&nbsp;
                    </a>
                    read reviews before making a decision. How many people
                    choose your competition because you <b>lack reviews?</b> The
                    truth is, insufficient reviews are already{' '}
                    <b>costing you</b> a great deal!
                </p>
                <b>We understand you.</b>
                <p>
                    That&apos;s why we offer to help you increase your reviews
                    to not only have a better reputation, but also rank better
                    on Google, and attract new customers.
                </p>
                <CTA />
            </section>

            <section className={styles.ourPlan}>
                <div className={styles.title}>
                    <h4>You Can Too Get More Reviews!</h4>
                    <p>
                        We will look at your unique situation, and discuss
                        different strategies to incorporate the software into
                        your workflow.
                    </p>
                    <p>
                        Additionally, we will teach your staff how to use the
                        software, to make everything effortless and smooth.
                    </p>
                </div>
                <Cards>
                    <Card>
                        <Image
                            src={appointmentIcon.src}
                            alt='Researching Your Situation'
                            width={30}
                            height={30}
                        />
                        <b>Book a Call</b>
                        <figcaption>
                            We will discuss your unique challenges, and together
                            decide whether this software is a good fit for your
                            business.
                        </figcaption>
                    </Card>
                    <Card>
                        <Image
                            src={gearIcon.src}
                            alt='Set up'
                            width={30}
                            height={30}
                        />
                        <b>Set up</b>
                        <figcaption>
                            We will set up the software + upload your existing
                            customer list, so you can get those 5-star review
                            right away!
                        </figcaption>
                    </Card>
                    <Card>
                        <Image
                            src={starIcon.src}
                            alt='Success'
                            width={30}
                            height={30}
                        />
                        <b>Success</b>
                        <figcaption>
                            You now have more 5-star reviews, and as a result
                            get more customers, and your revenue has increased.
                        </figcaption>
                    </Card>
                </Cards>
                <CTA />
            </section>
            <section className={styles.howWeDo}>
                <div className={styles.title}>
                    <h5>How Does It Work?</h5>
                    <p>
                        We have built the most comprehensive reputation
                        management software, and yet it&apos;s the easiest to
                        use!
                    </p>
                </div>
                <Cards>
                    <Card>
                        <b>Import Your Customer List</b>
                        <figcaption>
                            You can import your customer list, or add them
                            manually.
                        </figcaption>
                    </Card>
                    <Card>
                        <b>Send Out Review Requests</b>
                        <figcaption>
                            You can mass-send email/sms to all customers or
                            one-by-one.
                        </figcaption>
                    </Card>
                    <Card>
                        <b>Success</b>
                        <figcaption>
                            You now have more reviews, you can track the
                            reviews, reply to them, etc...
                        </figcaption>
                    </Card>
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
            <hr className={styles.line} />
            <section className={styles.faq}>
                <h6>Frequently Asked Questions (FAQ)</h6>
                <dl>
                    <dt>What are online reputation management software?</dt>
                    <dd>
                        Reputation management software helps business owners
                        manage their online reputation while collecting 5-star
                        reviews. Our software helps business owners increase
                        their reviews quickly and effortlessly.
                    </dd>
                    <dt>How long does reputation management take?</dt>
                    <dd>
                        With our reputation management software, you can expect
                        to see results immediately. You can even upload your
                        customer list to get a head start!
                    </dd>
                    <dt>How do I get more reviews for my business?</dt>
                    <dd>
                        You can get more reviews for your practice by asking
                        your customers for reviews. Review Surplus helps you
                        simplify this approach while collecting only 5-star
                        reviews.
                    </dd>
                    <dt>How does reputation management work?</dt>
                    <dd>
                        Review Surplus helps you send out SMS and email to your
                        customers. This process is super easy and requires
                        minimal effort on your end.
                    </dd>
                </dl>
            </section>
            {notificationContextHolder}
        </main>
    )
}
