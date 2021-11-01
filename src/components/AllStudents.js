import React from "react";
import StudentItem from "./StudentItem";
import '../css/students.css';
import TableStudentItem from "./TableStudentItem";

function AllStudents({students}) {
    return (<div className="students-wrapper">
                <p className="title"><strong>Все студенты</strong></p>
                <ul>
                    {
                        students
                            .map(student => {return <TableStudentItem student={student}/>
                            })
                    }
                </ul>
            </div>)
}

export default AllStudents;
