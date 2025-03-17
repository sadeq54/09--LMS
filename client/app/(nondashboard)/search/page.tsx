'use client'
import Loading from '@/components/Loading';
import { useGetCoursesQuery } from '@/state/api';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import CourseCardSearch from '@/components/CourseCardSearch';
import SelectedCourse from '@/components/SelectedCourse';

export default function Search() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id")
    const { data: courses, isLoading, isError } = useGetCoursesQuery({});
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (courses) {
            if (id) {
                const course = courses.find((course) => course.courseId === id);
                setSelectedCourse(course || courses[0]);
            } else {
                setSelectedCourse(courses[0]);
            }
        }
    }, [id, courses]);


    if (isLoading) return <Loading />;
    if (isError || !courses) return <div>Error loading courses</div>;

    const handleCoursesSelect = (course: Course) => {
        setSelectedCourse(course)
        router.push(`/search?id=${course.courseId}`)
    }
    const handleEnrollNow = (courseId: string) => {
        router.push(`/checkout?step=1&id=${courseId}showSignUp=false`);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="search"
        >
            <h1 className='search__title'>List of available Courses</h1>
            <h2 className='search__subtitle'>{courses.length} courses available</h2>
            <div className='search__content'>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="search__courses-grid"
                >
                    {courses.map((course) => (
                        <CourseCardSearch
                            key={course.courseId}
                            course={course}
                            isSelected={selectedCourse?.courseId === course.courseId}
                            onClick={() => handleCoursesSelect(course)}
                        />
                    ))}
                </motion.div>
                {selectedCourse && (
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="search__selected-course"
                    >
                        <SelectedCourse
                            course={selectedCourse}
                            handleEnrollNow={handleEnrollNow}
                        />
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}
