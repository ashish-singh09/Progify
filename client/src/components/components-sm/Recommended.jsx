import React, { useEffect, useState } from 'react';
import CardCourse from './CardCourse';
import axios from 'axios';

import RecommendSkeleton from './RecommendSkeleton';

const Recommended = () => {

    const [courses, setCourses] = useState([]);

    const fetchCourse = async () => {
        try {
            const res = await axios.get("/api/recommended/course");
            if (res.status === 200 && typeof res.data !== 'string') {
                setCourses(res.data);
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        fetchCourse();
    }, []);

    return (<>
        <section className='my-4'>
            <div className="container">
                <h4 className="fw-bold">Recommended for you</h4>
                <div className="row card-holder">
                    {(courses && courses?.length > 0) ? courses?.map((course) => {
                        return <CardCourse
                            id={course._id}
                            name={course.name}
                            creator={course.creator}
                            language={course.language}
                            course_pic={course.course_pic}
                        />
                    }) : <>
                        <RecommendSkeleton />
                        <RecommendSkeleton />
                        <RecommendSkeleton />
                        <RecommendSkeleton />
                    </>}
                </div>
            </div>
        </section>
    </>);
}

export default Recommended;