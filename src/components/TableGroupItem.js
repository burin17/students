import React from "react";
import {Link} from "react-router-dom";
import '../css/group.css';

function TableGroupItem({group}) {
    let groupAverageGrade = 0;
    group.students.forEach(student => groupAverageGrade += parseFloat(student.averageGrade));
    groupAverageGrade = Number((groupAverageGrade / group.students.length).toFixed(2));
    console.log(group);
    if(isNaN(groupAverageGrade)) {
        groupAverageGrade = 0;
    }

    return (<div>
                <li className="group-item table-group-item">
                    <div className="group-data table-group-data">
                        <strong>{group.title}</strong>
                        &nbsp;
                        <div>Форма обучения: {group.groupType}</div>
                        &nbsp;
                        <div>Курс: {group.course}</div>
                        &nbsp;
                        <div>Студенты: {group.students.length}</div>
                        &nbsp;
                        <div>Студенты-должники: {group.students.filter(student => student.isDebtor === 'true').length}</div>
                        &nbsp;
                        <div>Средний бал: {groupAverageGrade}</div>
                    </div>
                    <div className="group-item-action">
                        <Link to={`/groups/${group.id}`}>
                            <button>Студенты</button>
                        </Link>
                    </div>
                </li>
            </div>);
}

export default TableGroupItem;