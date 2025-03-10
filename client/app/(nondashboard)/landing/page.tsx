'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useCarousel } from '@/hooks/useCarousel'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCoursesQuery } from '@/state/api'

const LodingSkeleton = () => {
    return (
        <div className='landing-skeleton'>
            <div className='landing-skeleton__hero'>
                <div className='landing-skeleton__hero-content'>
                    <Skeleton className='landing-skeleton__title' />
                    <Skeleton className='landing-skeleton__subtitle' />
                    <Skeleton className='landing-skeleton__subtitle-secondary' />
                    <Skeleton className='landing-skeleton__button' />
                </div>
                <Skeleton className='landing-skeleton__hero-image' />
            </div>
            <div className='landing-skeleton__featured'>
                <Skeleton className='landing-skeleton__featured-title' />
                <Skeleton className='landing-skeleton__featured-description' />
                <div className='landing-skeleton__tags'>
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <Skeleton key={index} className='landing-skeleton__tag' />
                    ))}
                </div>
                <div className='landing-skeleton__courses'>
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <Skeleton key={index} className='landing-skeleton__course-card' />
                    ))}
                </div>
            </div>

        </div>
    )
}
export default function Landing() {

    const currentImage = useCarousel({ totalImages: 3 });
    const { data: courses, isLoading, isError } = useGetCoursesQuery({});
    console.log(courses)
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="landing"
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="landing__hero"
            >
                <div className='landing__hero-content'>
                    <h1 className='landing__title'>
                        Courses
                    </h1>
                    <p className='landing__description'>
                        This is the list of courses you can enroll in
                        <br />
                        Cources when u need them and want them
                    </p>
                    <div className='landing__cta'>
                        <Link href={'/search'}>
                            <div className='landing__cta-button'>search for the cousres</div>
                        </Link>
                    </div>
                </div>
                <div className='landing__hero-images'>
                    {["/hero1.jpg", "/hero2.jpg", '/hero3.jpg'].map((image, index) => (
                        <Image
                            key={image}
                            src={image}
                            alt={`Hero Image ${index + 1}`}
                            fill
                            priority={index === currentImage}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            className={`landing__hero-image ${index === currentImage ? 'landing__hero-image--active' : ''}`}
                        />
                    ))
                    }
                </div>
            </motion.div>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="landing__featured"
                viewport={{ once: true, amount: 0.3 }}
            >
                <h2 className='landing__featured-title'>
                    Featured Courses
                </h2>
                <p className="landing__featured-description">
                    From beginner to advanced, our curated courses cover a wide range of topics to help you succeed in your learning journey.
                </p>
                <div className="landing__tags">
                    {["web development", "react next js", "javascript", "backend development"].map((tag, index) => (
                        <span key={index} className="landing__tag">
                            {tag}
                        </span>
                    ))
                    }
                </div>
                <div className='landing__courses'>
                    {courses && courses.slice(0, 4).map((course, index) => (

                        <motion.div
                            key={course.courseId}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5  , delay: index * 0.1 }}
                            
                            viewport={{  amount: 0.4 }}
                        >
                                <CourseCardSearch/>
                        </motion.div>
                    ))}
                </div>

            </motion.div>
        </motion.div>
    )
}
