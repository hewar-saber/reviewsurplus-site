import Main from '@/components/Main/Main'
import styles from './page.module.scss'
import Highlight from '@/components/Highlight/Highlight'
import CTA from '@/components/CTA/CTA'
import FullLine from '@/components/FullLine/FullLine'
import SmallCard, { Cards } from '@/components/SmallCard/SmallCard'

import calendarIcon from '@/public/icons/calendar.svg'
import calendarIconWhite from '@/public/icons/white-calendar.svg'

import { SmallRows } from '@/components/Flex/Flex'
import Projects from '@/components/Projects/Projects'
import badCopy from '@/public/icons/bad-copy.svg'
import badCopyWhite from '@/public/icons/white-bad-copy.svg'
import badDesign from '@/public/icons/bad-design.svg'
import badDesignWhite from '@/public/icons/white-bad-design.svg'
import noTrust from '@/public/icons/no-trust.svg'
import noTrustWhite from '@/public/icons/white-no-trust.svg'

import goodCopy from '@/public/icons/good-copy.svg'
import goodCopyWhite from '@/public/icons/white-good-copy.svg'

import goodDesign from '@/public/icons/good-design.svg'
import goodDesignWhite from '@/public/icons/white-good-design.svg'
import goodWebsite from '@/public/icons/good-website.svg'
import goodWebsiteWhite from '@/public/icons/white-good-website.svg'

import researchIcon from '@/public/icons/research.svg'
import reasearchIconWhite from '@/public/icons/white-research.svg'

import launchIcon from '@/public/icons/launch.svg'
import launchIconWhite from '@/public/icons/white-launch.svg'

export default function Page() {
    return (
        <Main>
            <section className={styles.hero}>
                <SmallRows>
                    <p>7+ Years of experience</p>
                    <h1>
                        Website that Converts{' '}
                        <Highlight>Traffic to Sales</Highlight>
                    </h1>
                </SmallRows>
                <p className={styles.txt}>
                    We turn your <strong>traffic into paying customers</strong>{' '}
                    with persuasive copy and design.
                </p>
                <CTA labelEnabled />
            </section>
            <FullLine />
            <section className={styles.projects}>
                <Projects></Projects>
            </section>

            <section className={styles.stakes}>
                <h2>
                    High traffic, low conversion? Your copy & design might be
                    the issue...
                </h2>
                <p className={styles.description}>
                    Getting traffic is easy, converting the traffic to paying
                    customers is hard...
                </p>
                <Cards>
                    <SmallCard
                        imgSrc={badCopy.src}
                        darkThemeSrc={badCopyWhite.src}
                        imgWidth={50}
                        imgAlt='Bad Copy Icon'
                        title='Poor Copy'
                        description="It's hard to convince people to buy without persuasive copy."
                    />
                    <SmallCard
                        imgSrc={badDesign.src}
                        darkThemeSrc={badDesignWhite.src}
                        imgWidth={50}
                        imgAlt='Ineffective Design Icon'
                        title='Ineffective Design'
                        description='Confusing design frustrates users, causing them to leave.'
                    />

                    <SmallCard
                        imgSrc={noTrust.src}
                        darkThemeSrc={noTrustWhite.src}
                        imgWidth={50}
                        imgAlt='Lack of Trust Icon'
                        title='Lack of Trust'
                        description='Lack of testimonials, reviews and case studies affect conversion.'
                    />
                </Cards>
            </section>

            <section className={styles.valueProposition}>
                <h3>A High-Conversion & Unique Website Solves Your Problem.</h3>
                <Cards>
                    <SmallCard
                        imgSrc={goodCopy.src}
                        darkThemeSrc={goodCopyWhite.src}
                        imgWidth={50}
                        imgAlt='Pen writing Icon'
                        title='Persuasive Copy'
                        description="Convincing words that drive purchases. You'll receive persuasive copy."
                    />
                    <SmallCard
                        imgSrc={goodDesign.src}
                        darkThemeSrc={goodDesignWhite.src}
                        imgWidth={50}
                        imgAlt='Paintboard Icon'
                        title='Timeless Design'
                        description='A design that stands out and remains elegant over time.'
                    />
                    <SmallCard
                        imgSrc={goodWebsite.src}
                        darkThemeSrc={goodWebsiteWhite.src}
                        imgWidth={50}
                        imgAlt='Star Icon'
                        title='High Conversion'
                        description='Visually appealing design that boosts your conversion rate.'
                    />
                </Cards>
                <CTA />
            </section>

            <section className={styles.socialProof}>
                <h4>Our Tailored Designs Drive Sales for Our Clients</h4>
                <p>
                    All our designs are tailor made to get the highest
                    conversion our clients can get. No cookie cutters, or
                    templates.
                </p>
                <section className={styles.projects}>
                    <Projects></Projects>
                </section>
                <CTA
                    style={{
                        transform: 'rotate(var(--rotate))'
                    }}
                />
            </section>

            <section className={styles.process}>
                <h5>Simple Process</h5>
                <p className={styles.description}>
                    You can achieve a higher conversion rate too. Working with
                    us involves three simple steps.
                </p>
                <Cards>
                    <SmallCard
                        imgWidth={50}
                        imgSrc={calendarIcon.src}
                        darkThemeSrc={calendarIconWhite.src}
                        imgAlt='Calendar Icon'
                        title='Book a Call'
                        description='Choose a time slot that fits your schedule'
                    />
                    <SmallCard
                        imgWidth={50}
                        imgSrc={researchIcon.src}
                        darkThemeSrc={reasearchIconWhite.src}
                        imgAlt='Market Research Icon'
                        title='Market Research'
                        description='We will analyze your situation and research your market'
                    />
                    <SmallCard
                        imgWidth={50}
                        imgSrc={launchIcon.src}
                        darkThemeSrc={launchIconWhite.src}
                        imgAlt='High Conversion Website Icon'
                        title='High Conversion Website'
                        description="We'll test and launch your high-conversion website and keep in touch."
                    />
                </Cards>
                <CTA />
            </section>

            <section className={styles.faq} id='faq'>
                <h6>FAQ (Frequently Asked Questions)</h6>

                <details>
                    <summary>Who are your designers?</summary>
                    <p>
                        ReviewSurplus is a one-man agency, so you&apos;ll work
                        directly with Hewar, the founder. This guarantees our
                        clients always receive the highest quality.
                    </p>
                </details>

                <details>
                    <summary>
                        How long does it take to complete a project?
                    </summary>
                    <p>
                        Depending on the project, it might take days to weeks.
                        Simple landing pages take usually 2-7 days while big
                        websites might take 1-2 week.
                    </p>
                </details>

                <details>
                    <summary>
                        How do you ensure the website is high-converting?
                    </summary>
                    <p>
                        We use persuasive copywriting and timeless design to
                        ensure your website is high-converting.
                    </p>
                </details>

                <details>
                    <summary>What industries do you work with?</summary>
                    <p>
                        We work with all industries, but we specialize in
                        e-commerce, SaaS, and service-based businesses.
                    </p>
                </details>

                <details>
                    <summary>What are your prices?</summary>
                    <p>
                        Our prices vary depending on the project. Book a call to
                        get a quote.
                    </p>
                </details>
                <details>
                    <summary>What technologies do you use?</summary>
                    <p>
                        Depending on the project, we might recommend Next.js,
                        Framer, Wordpress or even other frameworks.
                    </p>
                </details>
                <details>
                    <summary>What if I don&apos;t like the design?</summary>
                    <p>
                        We offer unlimited revisions until you are satisfied
                        with the design.
                    </p>
                </details>

                <details>
                    <summary>Do you offer maintenance?</summary>
                    <p>
                        Yes, we offer maintenance plans to keep your website
                        up-to-date and secure.
                    </p>
                </details>

                <details>
                    <summary>Can I get a refund?</summary>
                    <p>
                        We do not offer refunds, but we offer unlimited
                        revisions until you are satisfied with the design.
                    </p>
                </details>
            </section>

            <section className={styles.lastCTA}>
                <h6>Stop Losing Leads Now</h6>

                <p className={styles.description}>
                    Let&apos;s build you a website that catches all the leads.
                    No more losing leads.
                </p>

                <CTA labelEnabled />
            </section>
        </Main>
    )
}
