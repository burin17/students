import React from "react";
import '../css/students.css';

function TableStudentItem({student}) {
    return (<div>
                <li className="student-item">
                    <div className="student-data students-table-item">
                        <div>{student.lastName}&nbsp;{student.firstName}&nbsp;{student.patronymic}</div>
                        &nbsp;
                        <div>Средний бал {student.averageGrade}</div>
                        &nbsp;
                        <div>Форма обучения {student.educationType}</div>
                        &nbsp;
                        <div>Возраст {student.age}</div>
                        &nbsp;
                        <div>Должник {student.isDebtor === 'true' ? 'Да' : 'Нет'}</div>
                        &nbsp;
                        <div>Группа {student.group.title}</div>
                        &nbsp;
                        <div>Курс {student.group.course}</div>
                    </div>
                </li>
            </div>);
}

export default TableStudentItem;