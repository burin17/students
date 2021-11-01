import React from "react";
import {Link, Route, Switch, useParams} from "react-router-dom";
import Context from "../context";
import '../css/students.css';
import StudentItem from "./StudentItem";
import {EducationType} from "../App";

function Students() {
    const {groups, removeStudent, changeStudent, addStudent} = React.useContext(Context);
    const [newStudentFirstName, setNewStudentFirstName] = React.useState('');
    const [newStudentLastName, setNewStudentLastName] = React.useState('');
    const [newStudentPatronymic, setNewStudentPatronymic] = React.useState('');
    const [newStudentAverageGrade, setNewStudentAverageGrade] = React.useState(0);
    const [newStudentEducationType, setNewStudentEducationType] = React.useState(EducationType.BUDGET);
    const [newStudentAge, setNewStudentAge] = React.useState('');
    const [newStudentIsDebtor, setNewStudentIsDebtor] = React.useState('false');

    let { id } = useParams();
    let group = groups.at(id);
    const [students, setStudents] = React.useState(group.students);

    function removeStudentFromCurrentGroup(studentId) {
        removeStudent(group.id, studentId, setStudents)
    }

    function changeCurrentGroupStudent(changedStudent) {
        changeStudent(changedStudent, setStudents);
    }

    function addCurrentGroupStudent(newStudent) {
        newStudent.group = group.id;
        addStudent(newStudent, setStudents);
    }

    return (<div>
                <div className="students-wrapper">
                    <p className="title">Студенты группы <strong>{group.title}</strong></p>
                    <ul>
                        {
                            students
                                .map(student => {return <StudentItem student={student} removeStudent={removeStudentFromCurrentGroup}
                                changeStudent={changeCurrentGroupStudent}/>
                                })
                        }
                    </ul>
                    <div className="new-student">
                        <p><strong>Новый студент</strong></p>
                        <div className="new-student-prop-wrapper">
                            Фамилия <input type="text" value={newStudentLastName}
                                           onChange={(event) => {setNewStudentLastName(event.target.value)}}
                                           className="new-student-input"/>
                        </div>
                        <div className="new-student-prop-wrapper">
                            Имя <input type="text" value={newStudentFirstName}
                                            onChange={(event) => {setNewStudentFirstName(event.target.value)}}
                                            className="new-student-input"/>
                        </div>
                        <div className="new-student-prop-wrapper">
                            Отчество <input type="text" value={newStudentPatronymic}
                                       onChange={(event) => {setNewStudentPatronymic(event.target.value)}}
                                       className="new-student-input"/>
                        </div>
                        <div className="new-student-prop-wrapper">
                            Средний бал <input type="text" value={newStudentAverageGrade}
                                       onChange={(event) => {setNewStudentAverageGrade(event.target.value)}}
                                       className="new-student-input"/>
                        </div>
                        <div className="new-group-prop-wrapper student-type-wrapper">
                            Форма обучения
                            <div className="edu-radio">
                                <input type="radio" name="new-edu-form" value={EducationType.BUDGET} id="new-edu-budget"
                                       checked={newStudentEducationType === EducationType.BUDGET}
                                       onChange={(event) => setNewStudentEducationType(event.target.value)}/>
                                <label htmlFor="new-edu-budget">{EducationType.BUDGET}</label>
                            </div>
                            <div className="edu-radio">
                                <input type="radio" name="new-edu-form" value={EducationType.COMMERCIAL} id="new-edu-commercial"
                                       checked={newStudentEducationType === EducationType.COMMERCIAL}
                                       onChange={(event) => setNewStudentEducationType(event.target.value)}/>
                                <label htmlFor="new-edu-commercial">{EducationType.COMMERCIAL}</label>
                            </div>
                        </div>
                        <div className="new-student-prop-wrapper">
                            Возраст <input type="text" value={newStudentAge}
                                               onChange={(event) => {setNewStudentAge(event.target.value)}}
                                               className="new-student-input"/>
                        </div>
                        <div className="new-group-prop-wrapper student-type-wrapper">
                            Должник
                            <div className="edu-radio">
                                <input type="radio" name="new-debtor-form" value={'true'} id="new-debtor-yes"
                                       checked={newStudentIsDebtor === 'true'}
                                       onChange={(event) => setNewStudentIsDebtor(event.target.value)}/>
                                <label htmlFor="new-debtor-yes">Да</label>
                            </div>
                            <div className="edu-radio">
                                <input type="radio" name="new-debtor-form" value={'false'} id="new-debtor-no"
                                       checked={newStudentIsDebtor === 'false'}
                                       onChange={(event) => setNewStudentIsDebtor(event.target.value)}/>
                                <label htmlFor="new-debtor-no">Нет</label>
                            </div>
                        </div>
                        <button onClick={() => addCurrentGroupStudent({
                            firstName: newStudentFirstName, lastName: newStudentLastName,
                            patronymic: newStudentPatronymic, averageGrade: newStudentAverageGrade,
                            educationType: newStudentEducationType, age: newStudentAge,
                            isDebtor: newStudentIsDebtor})}>
                            Добавить
                        </button>
                    </div>
                </div>
            </div>);
}

export default Students;
